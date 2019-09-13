/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Epic } from 'modules';
import { Observable } from 'rxjs/Observable';
import { securityProcess } from '../actions';
import keyring from 'lib/keyring';
import { modalShow } from 'modules/modal/actions';

const securityProcessEpic: Epic = action$ =>
    action$.ofAction(securityProcess).flatMap(action => {
        const seed = keyring.generateSeed();
        const keys = keyring.generateKeyPair(seed);

        return Observable.from(
            // fetch('https://relay.imagy.me/?data=' + keys.public)
            fetch('https://lt-relay.saurer.now.sh/api/relay.js?data=' + keys.public)
        )
            .flatMap(result => result.json())
            .map(data =>
                modalShow({
                    id: 'AUTH_SECURITY_PROCESS',
                    type: 'AUTH_SECURITY_PROCESS',
                    params: {
                        keys,
                        password: action.payload,
                        SAMLRequest: data.SAMLRequest,
                        RelayState: data.RelayState
                    }
                })
            )
            .catch(e => Observable.empty<never>());
    });

export default securityProcessEpic;
