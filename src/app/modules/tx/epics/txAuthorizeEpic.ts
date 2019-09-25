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

import uuid from 'uuid';
import { IRootState } from 'modules';
import { Epic } from 'redux-observable';
import { Action } from 'redux';
import { Observable } from 'rxjs';
import { modalShow, modalClose } from 'modules/modal/actions';
import { txAuthorize } from '../actions';
import { authorize } from 'modules/auth/actions';
import keyring from 'lib/keyring';
import { enqueueNotification } from 'modules/notifications/actions';

const txAuthorizeEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(txAuthorize.started)
        .switchMap(action => {
            const state = store.getState();
            if (keyring.validatePrivateKey(state.auth.privateKey)) {
                return Observable.of(txAuthorize.done({
                    params: action.payload,
                    result: null
                }));
            }
            else {
                return Observable.merge(
                    Observable.of(modalShow({
                        id: 'TX_AUTHORIZE',
                        type: 'AUTHORIZE',
                        params: {}
                    })),
                    action$.ofAction(modalClose)
                        .take(1)
                        .flatMap(result => {
                            if (result.payload.data) {
                                const privateKey = keyring.decryptAES(store.getState().auth.wallet.wallet.encKey, result.payload.data || '');
                                if (keyring.validatePrivateKey(privateKey)) {
                                    return Observable.of<Action>(
                                        authorize(privateKey),
                                        txAuthorize.done({
                                            params: action.payload,
                                            result: result.payload.data
                                        })
                                    );
                                }
                                else {
                                    return Observable.of<Action>(
                                        txAuthorize.failed({
                                            params: action.payload,
                                            error: null
                                        }),
                                        enqueueNotification({
                                            id: uuid.v4(),
                                            type: 'INVALID_PASSWORD',
                                            params: {}
                                        })
                                    );
                                }
                            }
                            else {
                                return Observable.of(txAuthorize.failed({
                                    params: action.payload,
                                    error: null
                                }));
                            }
                        })
                );
            }
        });

export default txAuthorizeEpic;