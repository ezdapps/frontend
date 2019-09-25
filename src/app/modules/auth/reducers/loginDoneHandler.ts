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

import { State } from '../reducer';
import { login } from '../actions';
import { Reducer } from 'modules';

const loginDoneHandler: Reducer<typeof login.done, State> = (state, payload) => ({
    ...state,
    isAuthenticated: true,
    isLoggingIn: false,
    ecosystem: state.wallet.access.ecosystem,
    session: payload.result.session,
    privateKey: payload.result.privateKey,
    id: state.wallet.wallet.id,
    isDefaultWallet: false
});

export default loginDoneHandler;