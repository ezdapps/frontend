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
import { closeEditorTab } from '../actions';
import { Reducer } from 'modules';

const closeEditorTabHandler: Reducer<typeof closeEditorTab, State> = (state, payload) => ({
    ...state,
    tabIndex: state.tabs.filter(l => l.dirty).length >= 0 ? 0 : -1,
    tabs: [
        ...state.tabs.filter(l => l.dirty)
    ]
});

export default closeEditorTabHandler;