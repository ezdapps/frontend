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
import { Epic } from 'modules';
import { loginGuest } from '../actions';
import { Observable } from 'rxjs/Observable';
import { push } from 'connected-react-router';
import keyring from 'lib/keyring';
import { publicToID } from 'lib/crypto';

const loginGuestEpic: Epic = (action$, store, { api, defaultKey, defaultPassword }) => action$.ofAction(loginGuest.started)
    .flatMap(action => {
        const publicKey = keyring.generatePublicKey(defaultKey);
        const network = store.getState().engine.guestSession.network;
        const client = api({ apiHost: network.apiHost });
        const id = publicToID(publicKey);

        return Observable.from(client.getUid())
            .flatMap(uid =>
                client.authorize(uid.token).login({
                    publicKey,
                    signature: keyring.sign(uid.uid, defaultKey),
                    ecosystem: '1',
                    expire: 60 * 60 * 24 * 90,
                    role: null
                })
            )

            // Successful authentication. Yield the result
            .flatMap(session => {
                return Observable.of<Action>(
                    push('/'),
                    loginGuest.done({
                        params: action.payload,
                        result: {
                            session: {
                                sessionToken: session.token,
                                network
                            },
                            wallet: {
                                wallet: {
                                    id,
                                    address: session.account,
                                    encKey: keyring.encryptAES(defaultKey, defaultPassword),
                                    publicKey,
                                    access: [{
                                        ecosystem: '1',
                                        name: '',
                                        roles: [],
                                        notifications: []
                                    }]
                                },
                                access: {
                                    ecosystem: '1',
                                    name: '',
                                    roles: [],
                                    notifications: []
                                }
                            },
                            privateKey: defaultKey,
                            publicKey
                        }
                    })
                );
            })

            // Catch actual login error, yield result
            .catch(e => Observable.of(
                loginGuest.failed({
                    params: action.payload,
                    error: e.error
                })
            ));

    });

export default loginGuestEpic;