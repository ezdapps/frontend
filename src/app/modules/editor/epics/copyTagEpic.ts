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

const copyTagEpic: Epic<Action, IRootState> =
    (action$, store, { constructorModule }) => action$.ofAction(actions.copyTag.started)
        .map(action => {
            const state = store.getState().editor;
            const tab = state.tabs[state.tabIndex].designer;
            const tabData = tab && tab.data || null;
            let jsonData = tabData.jsonData && constructorModule.copyObject(tabData.jsonData) || null;

            let tagCopy = constructorModule.copyObject(action.payload.tag);
            tagCopy.id = constructorModule.idGenerator.generateId();

            if (tagCopy.children) {
                constructorModule.setIds(tagCopy.children, true);
            }
            if (tagCopy.tail) {
                constructorModule.setIds(tagCopy.tail, true);
            }

            if ('string' === typeof action.payload.destinationTagID &&
                'string' === typeof action.payload.position) {
                let tag = constructorModule.findTagById(jsonData, action.payload.destinationTagID);
                if (tag.el) {
                    switch (action.payload.position) {
                        case 'inside':
                            if (tag.el.children) {
                                tag.el.children = [];
                            }
                            tag.el.children.push(tagCopy);
                            break;
                        case 'before':
                            if (tag.parent && tag.parent.id && tag.parent.children) {
                                tag.parent.children.splice(tag.parentPosition, 0, tagCopy);
                            }
                            else {
                                jsonData.splice(tag.parentPosition, 0, tagCopy);
                            }
                            break;
                        case 'after':
                            if (tag.parent && tag.parent.id && tag.parent.children) {
                                tag.parent.children.splice(tag.parentPosition + 1, 0, tagCopy);
                            }
                            else {
                                jsonData.splice(tag.parentPosition + 1, 0, tagCopy);
                            }
                            break;
                        default:
                            break;
                    }
                }
            }
            else {
                jsonData = jsonData.concat(
                    tagCopy
                );
            }

            jsonData = constructorModule.updateChildrenText(jsonData);

            return actions.copyTag.done({
                params: action.payload,
                result: {
                    jsonData,
                    treeData: constructorModule.convertToTreeData(jsonData)
                }
            });
        });

export default copyTagEpic;