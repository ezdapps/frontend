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

import { State } from '../reducer';
import { createEditorTab } from '../actions';
import { Reducer } from 'modules';

const createEditorTabDoneHandler: Reducer<typeof createEditorTab.done, State> = (state, payload) => ({
    ...state,
    tabs: [
        ...state.tabs,
        {
            uuid: payload.result.uuid,
            type: payload.params,
            id: payload.result.id,
            new: true,
            name: payload.result.name,
            tool: 'editor',
            value: payload.result.value,
            initialValue: payload.result.value,
            dirty: false
        }
    ],
    tabIndex: state.tabs.length
});

export default createEditorTabDoneHandler;