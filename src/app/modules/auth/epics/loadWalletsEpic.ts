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

import { Epic } from 'modules';
import { loadWallets } from '../actions';
import { Observable } from 'rxjs';
import { state$ } from 'store';

const loadWalletsEpic: Epic = (action$, store, { api }) => action$.ofAction(loadWallets.started)
    .switchMap(action => 
        Observable.timer(1, 5000).flatMap(() => {
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
                    access: keyInfo.ecosystems.map(key => ({
                        ...key,
                        roles: key.roles || []
                    }))
                }))
    
            ).toArray().map(wallets => loadWallets.done({
                params: action.payload,
                result: wallets
    
            })).catch(e => Observable.of(loadWallets.failed({
                params: action.payload,
                error: e
            })));
        }).takeUntil(state$.flatMap(state => 
            state.auth.isAuthenticated ? Observable.of(true) : Observable.empty()
        ))
    );

export default loadWalletsEpic;