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
import { Epic } from 'redux-observable';
import { IRootState } from 'modules';
import { resetEditorTab, revertEditorTab } from '../actions';
import { Observable } from 'rxjs';
import { modalShow } from 'modules/modal/actions';

const revertEditorTabEpic: Epic<Action, IRootState> = (action$, store) => action$.ofAction(revertEditorTab)
    .flatMap(action => {
        const state = store.getState();
        const tab = state.editor.tabs.find(t => t.uuid === action.payload);

        if (!tab) {
            return Observable.empty();
        }

        if (tab.dirty) {
            return Observable.of(modalShow({
                id: 'EDITOR_REVERT',
                type: 'EDITOR_REVERT_UNSAVED',
                params: {
                    uuid: tab.uuid
                }
            }));
        }

        return Observable.of(resetEditorTab(tab.uuid));
    });

export default revertEditorTabEpic;