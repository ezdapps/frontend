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
import * as actions from '../actions';
import { IRootState } from 'modules';

const removeTagEpic: Epic<Action, IRootState> =
    (action$, store, { constructorModule }) => action$.ofAction(actions.removeTag.started)
        .map(action => {
            const state = store.getState().editor;
            const tab = state.tabs[state.tabIndex].designer;
            const tabData = tab && tab.data || null;
            let jsonData = tabData.jsonData && constructorModule.copyObject(tabData.jsonData) || null;

            // delete moved element
            let sourceTag = constructorModule.findTagById(jsonData, action.payload.tag.id);
            if (sourceTag.parent) {
                if (sourceTag.tail) {
                    sourceTag.parent.tail.splice(sourceTag.parentPosition, 1);
                }
                else {
                    sourceTag.parent.children.splice(sourceTag.parentPosition, 1);
                }
            }
            else {
                // root
                jsonData.splice(sourceTag.parentPosition, 1);
            }

            jsonData = constructorModule.updateChildrenText(jsonData);

            return actions.removeTag.done({
                params: action.payload,
                result: {
                    jsonData,
                    treeData: constructorModule.convertToTreeData(jsonData)
                }
            });
        });

export default removeTagEpic;