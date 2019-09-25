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

import { Epic } from 'modules';
import { reloadPage, renderPage } from '../actions';
import { Observable } from 'rxjs';

const reloadPageEpic: Epic = (action$, store) => action$.ofAction(reloadPage)
    .switchMap(action => {
        const section = store.getState().sections.sections[action.payload.section];

        if (!section || !section.page) {
            return Observable.empty();
        }

        return Observable.of(renderPage.started({
            section: section.name,
            name: section.page.name,
            params: section.page.params,
            location: section.page.location
        }));
    });

export default reloadPageEpic;