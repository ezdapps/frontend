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
import { removeWallet } from '../actions';
import { removeWallet as removeStoredWallet } from 'modules/storage/actions';
import { modalClose, modalShow } from 'modules/modal/actions';

const removeWalletEpic: Epic = (action$, store) => action$.ofAction(removeWallet)
    .flatMap(action =>
        Observable.merge(
            Observable.of(modalShow({
                id: 'AUTH_REMOVE_WALLET',
                type: 'AUTH_REMOVE_WALLET',
                params: {
                    wallet: action.payload
                }
            })),
            action$.ofAction(modalClose)
                .take(1)
                .flatMap(result => {
                    if ('RESULT' === result.payload.reason) {
                        return Observable.of(removeStoredWallet(action.payload));
                    }
                    else {
                        return Observable.empty<never>();
                    }
                })
        )
    );

export default removeWalletEpic;