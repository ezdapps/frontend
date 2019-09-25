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
import { Observable } from 'rxjs';
import { discoverNetwork } from '../actions';
import NodeObservable from '../util/NodeObservable';
import { discover } from 'services/network';
import { mergeFullNodes } from 'modules/storage/actions';
import NetworkError from 'services/network/errors';

const discoverNetworkEpic: Epic = (action$, store, { api, defaultKey }) => action$.ofAction(discoverNetwork.started)
    .flatMap(action => {
        const network = store.getState().storage.networks.find(l => l.uuid === action.payload.uuid);

        return NodeObservable({
            nodes: network.fullNodes,
            count: 1,
            timeout: 10000,
            concurrency: 10,
            api

        }).defaultIfEmpty(null).flatMap(node =>
            Observable.if(
                () => null !== node,
                Observable.defer(() => Observable.from(discover({ uuid: network.uuid, apiHost: node }, defaultKey, network.id))
                    .flatMap(result => Observable.concat(
                        Observable.of(discoverNetwork.done({
                            params: action.payload,
                            result: {
                                session: {
                                    network: {
                                        uuid: network.uuid,
                                        apiHost: node
                                    },
                                    sessionToken: result.loginResult.token
                                }
                            }
                        })),
                        Observable.of(mergeFullNodes({
                            uuid: network.uuid,
                            fullNodes: result.fullNodes
                        }))
                    ))),
                Observable.defer(() => Observable.throw(NetworkError.Offline))
            )

        ).catch((error: NetworkError) => Observable.of(discoverNetwork.failed({
            params: action.payload,
            error

        })));
    });

export default discoverNetworkEpic;