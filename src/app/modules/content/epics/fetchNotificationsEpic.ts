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
import { Observable } from 'rxjs/Observable';
import { fetchNotifications } from 'modules/content/actions';

const fetchNotificationsEpic: Epic = (action$, store, { api }) => action$.ofAction(fetchNotifications.started)
    .flatMap(action => {
        const state = store.getState();
        const client = api({
            apiHost: state.auth.session.network.apiHost,
            sessionToken: state.auth.session.sessionToken
        });

        return Observable.fromPromise(client.content({
            type: 'page',
            name: '@1notifications',
            params: {},
            locale: state.storage.locale

        })).map(payload =>
            fetchNotifications.done({
                params: action.payload,
                result: payload.tree
            })
        ).catch(e =>
            Observable.of(fetchNotifications.failed({
                params: action.payload,
                error: null
            }))
        );
    });

export default fetchNotificationsEpic;