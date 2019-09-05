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
import { saveWallet } from '../actions';
import { createWallet, createAccount } from 'modules/auth/actions';
import { isType } from 'typescript-fsa';

const saveWalletOnCreateEpic: Epic =
    (action$, store) => action$.filter(action => isType(action, createWallet.done) || isType(action, createAccount.done))
        .map((action: any) =>
            saveWallet(action.payload.result)
        );

export default saveWalletOnCreateEpic;