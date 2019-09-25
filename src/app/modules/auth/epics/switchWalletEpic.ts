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
import { switchWallet, selectWallet, logout } from '../actions';
import { Observable } from 'rxjs/Observable';

const switchWalletEpic: Epic = (action$, store, { api }) => action$.ofAction(switchWallet)
    .flatMap(action => {
        const state = store.getState();
        const wallet = state.auth.wallets.find(l => l.id === state.auth.wallet.wallet.id);
        const access = wallet.access.find(l => l.ecosystem === action.payload.ecosystem);

        return Observable.of(
            logout.started(null),
            selectWallet({
                wallet,
                access,
                role: action.payload.role ? access.roles.find(l => l.id === action.payload.role) : null
            })
        );
    });

export default switchWalletEpic;