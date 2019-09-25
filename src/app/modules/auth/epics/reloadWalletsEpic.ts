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
import { logout, loadWallets } from '../actions';
import { discoverNetwork, initialize } from 'modules/engine/actions';

const reloadWalletsEpic: Epic = (action$, store) => action$.ofType(logout.done.type, discoverNetwork.done.type, initialize.done.type)
    .filter(l => {
        const session = store.getState().engine.guestSession;
        return !!(session && store.getState().storage.networks.find(n => n.uuid === session.network.uuid));

    }).map(action => loadWallets.started(null));

export default reloadWalletsEpic;