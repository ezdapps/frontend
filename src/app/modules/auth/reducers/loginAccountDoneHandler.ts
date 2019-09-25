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
import { loginAccount } from '../actions';
import { Reducer } from 'modules';

const loginAccountDoneHandler: Reducer<typeof loginAccount.done, State> = (state, payload) => ({
    ...state,
    isAuthenticated: true,
    isLoggingIn: false,
    wallet: payload.result.context,
    session: payload.result.session,
    privateKey: payload.result.privateKey,
    id: payload.params.account.id,
    isDefaultWallet: false
});

export default loginAccountDoneHandler;