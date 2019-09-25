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

import 'rxjs';
import 'lib/external/fsa';
import { Action } from 'redux';
import { ActionsObservable } from 'redux-observable';
import { getPageTree } from '../actions';
import getPageTreeDoneEpic from './getPageTreeDoneEpic';
import dependencies from 'modules/dependencies';
import mockStore from 'test/mockStore';

describe('generatePageTemplateEpic', () => {
    it('generate PageTemplate', () => {

        const action$ = ActionsObservable.of<Action>(getPageTree.done({
                params: null,
                result: {
                    jsonData: [],
                    treeData: []
                }
            }
        ));
        const expectedOutput: any = [
            {
                payload: null,
                type: 'editor/SAVE_CONSTRUCTOR_HISTORY_STARTED'
            }
        ];

        getPageTreeDoneEpic(action$, mockStore, { constructorModule: dependencies.constructorModule })
            .toArray()
            .subscribe(actualOutput => {
                expect(actualOutput).toEqual(expectedOutput);
            });
    });
});