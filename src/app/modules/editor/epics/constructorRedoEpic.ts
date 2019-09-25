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
import { Observable } from 'rxjs';

const constructorRedoEpic: Epic<Action, IRootState> =
    (action$, store, { constructorModule }) => action$.ofAction(actions.constructorRedo.started)
        .flatMap(action => {
            const state = store.getState().editor;

            const tab = state.tabs[state.tabIndex].designer;
            const tabHistory = tab && tab.history || null;

            const historyData = tabHistory && tabHistory.data || [];

            let position = tabHistory && tabHistory.position || 0;

            if (position < historyData.length && historyData.length > 0) {
                position++;
                const canUndo = position > 1;
                const canRedo = position < historyData.length;

                let jsonData = historyData[position - 1];
                jsonData = constructorModule.updateChildrenText(jsonData);

                return Observable.of(actions.constructorRedo.done({
                    params: action.payload,
                    result: {
                        jsonData,
                        treeData: constructorModule.convertToTreeData(jsonData),
                        position,
                        canUndo,
                        canRedo
                    }
                }));
            }
            else {
                return Observable.empty();
            }
        });

export default constructorRedoEpic;