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
import { loadWallet } from '../actions';
import { Observable } from 'rxjs';
import { saveWallet } from 'modules/storage/actions';

const loadSavedWalletEpic: Epic = (action$, store, { api }) => action$.ofAction(saveWallet)
    .flatMap(action => {
        const network = store.getState().engine.guestSession.network;
        const client = api({ apiHost: network.apiHost });

        return Observable.from(client.keyinfo({
            id: action.payload.id

        })).map(account => loadWallet({
            id: action.payload.id,
            address: account.account,
            encKey: action.payload.encKey,
            publicKey: action.payload.publicKey,
            access: account.ecosystems.map(key => ({
                ...key,
                roles: key.roles || []
            }))

        })).catch(e => Observable.empty<never>());
    });

export default loadSavedWalletEpic;