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
import { logout, deauthorize } from '../actions';
import { Observable } from 'rxjs/Observable';
import { closeAllEditorTabs } from 'modules/editor/actions';
import { isType } from 'typescript-fsa';
import { discoverNetwork } from 'modules/engine/actions';

const logoutEpic: Epic = (action$, store) => action$
    .filter(action => isType(action, logout.started) || isType(action, discoverNetwork.done))
    .flatMap(action =>
        Observable.of<Action>(
            deauthorize(null),
            closeAllEditorTabs(),
            logout.done({
                params: null,
                result: null
            })
        )
    );

export default logoutEpic;