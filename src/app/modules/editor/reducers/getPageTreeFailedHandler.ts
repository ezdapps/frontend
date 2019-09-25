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
import { getPageTree } from '../actions';
import { Reducer } from 'modules';

const getPageTreeFailedHandler: Reducer<typeof getPageTree.failed, State> = (state, payload) => {
    const data = state.tabs[state.tabIndex] && state.tabs[state.tabIndex].designer && state.tabs[state.tabIndex].designer.data;
    return {
        ...state,
        tabs: [
            ...state.tabs.slice(0, state.tabIndex),
            {
                ...state.tabs[state.tabIndex],
                designer: {
                    ...state.tabs[state.tabIndex].designer,
                    data: {
                        ...data,
                        jsonData: [],
                        treeData: [],
                        selectedTag: null
                    }
                }
            },
            ...state.tabs.slice(state.tabIndex + 1),
        ]
    };
};

export default getPageTreeFailedHandler;