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
import { Observable } from 'rxjs';
import { addNetwork, navigate } from '../actions';
import { discover } from 'services/network';
import NetworkError from 'services/network/errors';
import { saveNetwork } from 'modules/storage/actions';
import { modalShow } from 'modules/modal/actions';
import { Action } from 'redux';

const addNetworkEpic: Epic = (action$, _store, { defaultKey }) => action$.ofAction(addNetwork.started)
    .flatMap(action => {
        const uniqueID = uuid.v4();

        return Observable.from(discover({ uuid: uniqueID, apiHost: action.payload.apiHost }, defaultKey, action.payload.networkID))
            .flatMap(result => Observable.of(
                navigate('/networks'),
                saveNetwork({
                    uuid: uniqueID,
                    id: result.networkID,
                    fullNodes: result.fullNodes,
                    name: action.payload.name
                }),
                addNetwork.done(null)
            ))
            .catch((e: NetworkError) => Observable.of<Action>(
                modalShow({
                    id: 'NETWORK_ERROR',
                    params: {
                        error: e
                    },
                    type: 'NETWORK_ERROR'
                }),
                addNetwork.failed({
                    params: action.payload,
                    error: e
                })
            ));
    });

export default addNetworkEpic;