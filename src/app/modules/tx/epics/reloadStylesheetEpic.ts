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

import { IRootState } from 'modules';
import { Epic } from 'redux-observable';
import { Action } from 'redux';
import { txExec } from '../actions';
import { reloadStylesheet } from 'modules/content/actions';
import { Observable } from 'rxjs';

const reloadStylesheetEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(txExec.done)
        .filter(l => !!l.payload.params.contracts.find(c => /^(@1)?EditParameter$/.test(c.name) && !!c.params.find(p => 'stylesheet' === p.name)))
        .flatMap(s => Observable.from(s.payload.params.contracts))
        .flatMap(contract => Observable.from(contract.params))
        .map(params =>
            reloadStylesheet(params.value)
        );

export default reloadStylesheetEpic;