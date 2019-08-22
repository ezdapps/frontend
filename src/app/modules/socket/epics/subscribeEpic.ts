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
import { Epic } from 'modules';
import { Observer } from 'rxjs';
import { subscribe, setNotificationsCount } from '../actions';
import { fetchNotifications } from 'modules/content/actions';
import findNotificationsCount from '../util/findNotificationsCount';
import platform from 'lib/platform';

const subscribeEpic: Epic = (action$, store) => action$.ofAction(subscribe.started)
    .flatMap(action => {
        const state = store.getState();
        if (state.socket.subscriptions.find(l => l.wallet.id === action.payload.id)) {
            return Observable.of(subscribe.failed({
                params: action.payload,
                error: 'E_ALREADY_SUBSCRIBED'
            }));
        }
        else if (!state.socket.socket) {
            return Observable.of(subscribe.failed({
                params: action.payload,
                error: 'E_SOCKET_OFFLINE'
            }));
        }
        else {
            return Observable.create((observer: Observer<Action>) => {
                const sub = state.socket.socket.subscribe('client' + action.payload.address, (message: { data: { role_id: string, ecosystem: string, count: number }[] }) => {
                    let count = 0;

                    message.data.forEach(n => {
                        const subState = store.getState();
                        const notifications = findNotificationsCount(subState.socket, subState.auth.wallet);

                        if (subState.auth.isAuthenticated &&
                            (
                                subState.auth.wallet.role && subState.auth.wallet.role.id === n.role_id ||
                                '0' === n.role_id
                            ) &&
                            subState.auth.wallet &&
                            subState.auth.wallet.wallet.id === action.payload.id &&
                            subState.auth.wallet.access.ecosystem === n.ecosystem.toString()
                        ) {
                            count += n.count;
                        }

                        observer.next(setNotificationsCount({
                            id: action.payload.id,
                            ecosystem: n.ecosystem,
                            role: n.role_id,
                            count: n.count
                        }));

                        const notificationsNew = findNotificationsCount(subState.socket, subState.auth.wallet);
                        if (notifications !== notificationsNew) {
                            observer.next(fetchNotifications.started(undefined));
                        }
                    });

                    platform.on('desktop', () => {
                        const Electron = require('electron');
                        Electron.remote.app.setBadgeCount(count);
                    });
                });

                observer.next(subscribe.done({
                    params: action.payload,
                    result: sub
                }));
            });
        }
    });

export default subscribeEpic;