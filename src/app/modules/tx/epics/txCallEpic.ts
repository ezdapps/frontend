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
import { Observable } from 'rxjs';
import { txCall, txAuthorize, txExec } from '../actions';
import { isType } from 'typescript-fsa';
import keyring from 'lib/keyring';

const txCallEpic: Epic = (action$, store) => action$.ofAction(txCall)
    // Ask for password if there is no privateKey
    .flatMap(action => Observable.if(
        () => keyring.validatePrivateKey(store.getState().auth.privateKey),
        Observable.of(txExec.started(action.payload)),
        Observable.merge(
            Observable.of(txAuthorize.started({})),
            action$.filter(l => txAuthorize.done.match(l) || txAuthorize.failed.match(l))
                .take(1)
                .flatMap(result => Observable.if(
                    () => isType(result, txAuthorize.done),
                    Observable.of(txExec.started(action.payload)),
                    Observable.empty<never>()
                ))
        )
    ));

export default txCallEpic;