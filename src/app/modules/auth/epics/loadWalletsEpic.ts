/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Epic } from 'modules';
import { loadWallets } from '../actions';
import { Observable } from 'rxjs';

const loadWalletsEpic: Epic = (action$, store, { api }) => action$.ofAction(loadWallets.started)
    .flatMap(action => {
        const state = store.getState();
        const network = store.getState().engine.guestSession.network;
        const client = api({ apiHost: network.apiHost });

        return Observable.from(state.storage.wallets).flatMap(wallet =>
            Observable.from(client.keyinfo({
                id: wallet.id
            })).map(keyInfo => ({
                id: wallet.id,
                address: keyInfo.account,
                encKey: wallet.encKey,
                publicKey: wallet.publicKey,
                // access: keyInfo.ecosystems.map(key => ({
                //     ...key,
                //     roles: key.roles || []
                // }))
                access: (keyInfo as any).length ? [
                    {
                        ecosystem: '1',
                        name: 'FAKE',
                        roles: [
                            { id: '3', name: 'FAKE' }
                        ],
                        notifications: []
                    }
                ] : []
            }))

        ).toArray().map(wallets => loadWallets.done({
            params: action.payload,
            result: wallets

        })).catch(e => {
            // tslint:disable-next-line: no-console
            console.error(e);
            return Observable.of(loadWallets.failed({
                params: action.payload,
                error: e
            }));
        });
    });

export default loadWalletsEpic;