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

const selectTagEpic: Epic<Action, IRootState> =
    (action$, store, { constructorModule }) => action$.ofAction(actions.selectTag.started)
        .map(action => {
            const state = store.getState().editor;
            const tabData = state.tabs[state.tabIndex].designer.data;
            const jsonData = tabData && constructorModule.copyObject(tabData.jsonData) || null;

            const selectedTag = action.payload;

            return actions.selectTag.done({
                params: action.payload,
                result: {
                    treeData: constructorModule.convertToTreeData(jsonData, selectedTag),
                    selectedTag
                }
            });

        });

export default selectTagEpic;