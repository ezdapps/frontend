/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Action } from 'redux';
import { Epic } from 'modules';
import { acquireSession, loginAccount } from '../actions';
import { Observable } from 'rxjs/Observable';
import keyring from 'lib/keyring';
import { push } from 'connected-react-router';

const loginAccountEpic: Epic = (action$, store, { api }) => action$.ofAction(loginAccount.started)
    .flatMap(action => {
        const privateKey = keyring.decryptAES(action.payload.account.encKey, action.payload.password);
        const state = store.getState();
        const networkEndpoint = state.engine.guestSession.network;

        if (!keyring.validatePrivateKey(privateKey)) {
            return Observable.of(loginAccount.failed({
                params: action.payload,
                error: 'E_INVALID_PASSWORD'
            }));
        }

        const publicKey = keyring.generatePublicKey(privateKey);
        const client = api({ apiHost: networkEndpoint.apiHost });
        const ecosystem = '1';

        return Observable.from(client.keyinfo({ id: action.payload.account.id })).flatMap(keyInfo => {
            const firstEcosystem = (keyInfo.ecosystems || []).find(e => ecosystem === e.ecosystem);
            if (!firstEcosystem) {
                return Observable.of(loginAccount.failed({
                    params: action.payload,
                    error: 'E_INVALID_PASSWORD'
                }));
            }

            const role = (firstEcosystem.roles || []).length ? firstEcosystem.roles[0] : null;

            return Observable.from(client.getUid())
                .flatMap(uid => {
                    return client.authorize(uid.token).login({
                        publicKey,
                        signature: keyring.sign(uid.uid, privateKey),
                        ecosystem,
                        expire: 60 * 60 * 24 * 90,
                        role: role ? Number(role.id) : null
                    });
                })

                // Successful authentication. Yield the result
                .flatMap(response => {
                    const sessionResult = {
                        sessionToken: response.token,
                        network: networkEndpoint
                    };
    
                    return Observable.of<Action>(
                        push('/'),
                        loginAccount.done({
                            params: action.payload,
                            result: {
                                session: sessionResult,
                                privateKey,
                                publicKey,
                                context: {
                                    wallet: {
                                        ...action.payload.account,
                                        address: keyInfo.account,
                                        access: keyInfo.ecosystems,
                                    },
                                    access: firstEcosystem,
                                    role
                                }
                            }
                        }),
                        acquireSession.started(sessionResult)
                    );
                })
                // Catch actual login error, yield result
                .catch(e => Observable.of(
                    loginAccount.failed({
                        params: action.payload,
                        error: e.error
                    })
                ));
            });
    });

export default loginAccountEpic;