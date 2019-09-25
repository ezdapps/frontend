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

import uuid from 'uuid';
import { Epic } from 'modules';
import { createEditorTab } from '../actions';

const createEditorTabEpic: Epic = (action$, store) => action$.ofAction(createEditorTab.started)
    .map(action => {
        const state = store.getState();

        const ids = state.editor.tabs
            .filter(l => l.new)
            .map(l => l.id)
            .sort();

        const id = (ids.length ? parseInt(ids[ids.length - 1], 10) + 1 : 1).toString();

        switch (action.payload) {
            case 'contract':
                return createEditorTab.done({
                    params: action.payload,
                    result: {
                        uuid: uuid.v4(),
                        id,
                        name: null,
                        value: 'contract ... {\n    data {\n\n    }\n    conditions {\n\n    }\n    action {\n\n    }\n}'
                    }
                });

            case 'page':
            case 'block':
            case 'menu':
                return createEditorTab.done({
                    params: action.payload,
                    result: {
                        uuid: uuid.v4(),
                        id,
                        name: null,
                        value: ''
                    }
                });

            default: return createEditorTab.failed({
                params: action.payload,
                error: null
            });
        }
    });

export default createEditorTabEpic;