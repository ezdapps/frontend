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
import { Epic } from 'modules';
import { Observable } from 'rxjs/Observable';
import { displayData } from 'modules/content/actions';
import { modalShow } from 'modules/modal/actions';
import urlJoin from 'url-join';

const displayDataEpic: Epic = (action$, store, { api }) => action$.ofAction(displayData.started)
    .flatMap(action => {
        const network = store.getState().engine.guestSession.network;

        return Observable.ajax({
            url: urlJoin(network.apiHost, 'api/v2', action.payload),
            responseType: 'text'

        }).flatMap(payload => Observable.of<Action>(
            modalShow({
                id: 'DISPLAY_INFO',
                type: 'INFO',
                params: {
                    value: payload.response
                }
            }),
            displayData.done({
                params: action.payload,
                result: payload.response
            })

        )).catch(e =>
            Observable.of(displayData.failed({
                params: action.payload,
                error: e
            }))
        );
    });

export default displayDataEpic;