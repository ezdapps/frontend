// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

import { Action } from 'redux';
import { Observable } from 'rxjs/Observable';
import { Epic } from 'redux-observable';
import { IRootState } from 'modules';
import { connect, disconnect, setConnected } from '../actions';
import * as Centrifuge from 'centrifuge';
import SockJS from 'sockjs-client';
import { Observer } from 'rxjs';

const connectEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(connect.started)
        .flatMap(action => {
            if (action.payload.wsHost && action.payload.userID && action.payload.timestamp && action.payload.socketToken) {
                return Observable.create((observer: Observer<Action>) => {
                    observer.next(disconnect.started(null));

                    const centrifuge = new Centrifuge({
                        url: action.payload.wsHost,
                        user: action.payload.userID,
                        timestamp: action.payload.timestamp,
                        token: action.payload.socketToken,
                        sockJS: SockJS
                    });

                    centrifuge.on('connect', context => {
                        observer.next(connect.done({
                            params: action.payload,
                            result: {
                                session: action.payload.session,
                                instance: centrifuge
                            }
                        }));
                    });

                    centrifuge.on('disconnect', context => {
                        observer.next(setConnected(false));
                    });

                    centrifuge.on('error', error => {
                        observer.next(connect.failed({
                            params: action.payload,
                            error: error.message.error
                        }));
                    });

                    centrifuge.connect();

                }).takeUntil(action$.ofAction(connect.started));
            }
            else {
                return Observable.of(connect.failed({
                    params: action.payload,
                    error: null
                }));
            }

        });

export default connectEpic;