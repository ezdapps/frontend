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
import { importWallet } from '../actions';
import { Observable } from 'rxjs/Observable';
import { navigate } from 'modules/engine/actions';
import { publicToID } from 'lib/crypto';
import keyring from 'lib/keyring';

const importWalletEpic: Epic = (action$, store, { api }) => action$.ofAction(importWallet.started)
    .flatMap(action => {
        if (!action.payload.backup || action.payload.backup.length !== keyring.KEY_LENGTH) {
            return Observable.of(importWallet.failed({
                params: action.payload,
                error: 'E_INVALID_KEY'
            }));
        }

        const privateKey = action.payload.backup;
        const publicKey = keyring.generatePublicKey(action.payload.backup);
        const encKey = keyring.encryptAES(privateKey, action.payload.password);
        const keyID = publicToID(publicKey);

        return Observable.of<Action>(
            importWallet.done({
                params: action.payload,
                result: {
                    id: keyID,
                    encKey,
                    publicKey
                }
            }),
            navigate('/')
        );

    }).catch(e => Observable.of(importWallet.failed({
        params: null,
        error: 'E_IMPORT_FAILED'
    })));

export default importWalletEpic;