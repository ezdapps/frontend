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
import { Observable } from 'rxjs/Observable';
import { createWallet } from '../actions';
import { navigate } from 'modules/engine/actions';
import keyring from 'lib/keyring';
import { publicToID } from 'lib/crypto';

const createWalletEpic: Epic = (action$, store, { api }) => action$.ofAction(createWallet.started)
    .flatMap(action => {
        const keys = keyring.generateKeyPair(action.payload.seed);
        const publicKey = keyring.generatePublicKey(keys.private);
        const encKey = keyring.encryptAES(keys.private, action.payload.password);
        const keyID = publicToID(keys.public);

        return Observable.of<Action>(
            createWallet.done({
                params: action.payload,
                result: {
                    id: keyID,
                    encKey,
                    publicKey
                }
            }),
            navigate('/')
        );

    }).catch(e => Observable.of(createWallet.failed({
        params: null,
        error: 'E_IMPORT_FAILED'
    })));

export default createWalletEpic;