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
import { Observable } from 'rxjs/Observable';
import { createWallet, createAccount } from '../actions';
import keyring from 'lib/keyring';
import { publicToID } from 'lib/crypto';
import { modalShow } from 'modules/modal/actions';
import { replaceAccount } from 'modules/storage/actions';

const createAccountEpic: Epic = action$ => action$.ofAction(createAccount.started)
    .flatMap(action => {
        const encKey = keyring.encryptAES(action.payload.keys.private, action.payload.password);
        const keyID = publicToID(action.payload.keys.public);

        return Observable.concat(
            Observable.of(createAccount.done({
                params: action.payload,
                result: {
                    id: keyID,
                    encKey,
                    publicKey: action.payload.keys.public
                }
            })),
            Observable.of(replaceAccount({
                id: keyID,
                encKey,
                publicKey: action.payload.keys.public
            })),
            Observable.of(modalShow({
                id: 'AUTH_ACCOUNT_CREATED',
                type: 'AUTH_ACCOUNT_CREATED',
                params: {
                    name: 'Pending Validation',
                    account: 'XXXX-XXXX-XXXX-XXXX-XXXX'
                }
            }))
        );

    }).catch(e => Observable.of(createWallet.failed({
        params: null,
        error: 'E_IMPORT_FAILED'
    })));

export default createAccountEpic;