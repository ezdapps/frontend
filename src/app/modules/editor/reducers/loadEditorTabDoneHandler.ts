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
import { loadEditorTab } from '../actions';
import { Reducer } from 'modules';
import findTabIndex from './findTabIndex';

const loadEditorTabDoneHandler: Reducer<typeof loadEditorTab.done, State> = (state, payload) => {
    const tabIndex = findTabIndex(state, payload.result);

    const tabs = -1 === tabIndex ?
        [
            ...state.tabs,
            {
                ...payload.result
            }
        ] : [
            ...state.tabs.slice(0, tabIndex),
            {
                ...state.tabs[tabIndex],
                initialValue: payload.result.initialValue,
                dirty: payload.result.initialValue !== state.tabs[tabIndex].value
            },
            ...state.tabs.slice(tabIndex + 1)
        ];

    return {
        ...state,
        tabIndex: -1 === tabIndex ? tabs.length - 1 : tabIndex,
        tabs
    };
};

export default loadEditorTabDoneHandler;