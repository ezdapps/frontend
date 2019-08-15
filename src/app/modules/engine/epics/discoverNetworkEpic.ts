/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Epic } from 'modules';
import { Observable } from 'rxjs';
import { discoverNetwork } from '../actions';
import NodeObservable from '../util/NodeObservable';
import { discover } from 'services/network';
import { mergeFullNodes } from 'modules/storage/actions';
import NetworkError from 'services/network/errors';

const setNetworkEpic: Epic = (action$, store, { api, defaultKey }) => action$.ofAction(discoverNetwork.started)
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

export default setNetworkEpic;