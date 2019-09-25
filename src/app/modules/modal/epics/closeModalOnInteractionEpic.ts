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
import { isType } from 'typescript-fsa';
import { Observable } from 'rxjs/Observable';
import { modalClose } from '../actions';
import { logout } from 'modules/auth/actions';
import { locationChange } from 'modules/router/actions';

const closeModalOnInteractionEpic: Epic = (action$, store) => action$.filter(action => isType(action, locationChange) || isType(action, logout.started))
    .flatMap(() => {
        const state = store.getState();

        return Observable.if(
            () => state.modal.type && !state.modal.result,
            Observable.of(modalClose({
                reason: 'CANCEL',
                data: null
            })),
            Observable.empty<never>()
        );
    });

export default closeModalOnInteractionEpic;