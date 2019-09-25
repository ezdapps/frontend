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

const changePasswordEpic: Epic = (action$, store, { api }) => action$.ofAction(changePassword.started)
    .flatMap(action => {
        const encKey = store.getState().auth.wallet.wallet.encKey;
        return Observable.merge(
            Observable.of(modalShow({
                id: 'AUTH_CHANGE_PASSWORD',
                type: 'AUTH_CHANGE_PASSWORD',
                params: {
                    encKey
                }
            })),
            action$.ofAction(modalClose)
                .take(1)
                .flatMap(result => {
                    if ('RESULT' === result.payload.reason) {
                        return Observable.of(changePassword.done({
                            params: action.payload,
                            result: result.payload.data
                        }));
                    }
                    else {
                        return Observable.empty<never>();
                    }
                })
        );
    });

export default changePasswordEpic;