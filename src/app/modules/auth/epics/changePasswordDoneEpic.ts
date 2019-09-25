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
import { changePassword } from '../actions';
import { modalShow, modalClose } from 'modules/modal/actions';
import { logout } from 'modules/auth/actions';
import { saveWallet } from 'modules/storage/actions';
import keyring from 'lib/keyring';

const changePasswordDoneEpic: Epic = (action$, store, { api }) => action$.ofAction(changePassword.done)
    .flatMap(action => {
        const auth = store.getState().auth;
        const wallet = auth.wallet;
        const wallets = store.getState().storage.wallets;
        const privateKey = keyring.decryptAES(wallet.wallet.encKey, action.payload.result.oldPassword);

        if (!keyring.validatePrivateKey(privateKey)) {
            return Observable.concat(
                Observable.of(changePassword.failed({
                    params: null,
                    error: 'E_INVALID_PASSWORD'
                })),
                Observable.of(modalShow({
                    id: 'AUTH_ERROR',
                    type: 'AUTH_ERROR',
                    params: {
                        error: 'E_INVALID_PASSWORD'
                    }
                }))
            );
        }

        const encKey = keyring.encryptAES(privateKey, action.payload.result.newPassword);

        return Observable.concat(

            Observable.from(wallets.filter(l => l.id === wallet.wallet.id))
                .map(w => saveWallet({
                    ...w,
                    encKey
                })),

            Observable.merge(
                Observable.of(modalShow({
                    id: 'AUTH_PASSWORD_CHANGED',
                    type: 'AUTH_PASSWORD_CHANGED',
                    params: {}
                })),
                action$.ofAction(modalClose)
                    .take(1)
                    .flatMap(result => {
                        return Observable.of(logout.started(null));
                    })
            )
        );
    });

export default changePasswordDoneEpic;