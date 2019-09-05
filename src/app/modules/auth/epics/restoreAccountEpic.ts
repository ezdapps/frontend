/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Action } from 'redux';
import { Epic } from 'modules';
import { Observable } from 'rxjs/Observable';
import { restoreAccount } from '../actions';
import keyring from 'lib/keyring';
import { publicToID, addressString } from 'lib/crypto';
import { modalShow } from 'modules/modal/actions';

const restoreAccountEpic: Epic = (action$, store, { api }) => action$.ofAction(restoreAccount.started)
    .flatMap(action => {
        const publicKey = keyring.generatePublicKey(action.payload.privateKey);
        const encKey = keyring.encryptAES(action.payload.privateKey, action.payload.password);
        const keyID = publicToID(publicKey);

        return Observable.of<Action>(
            restoreAccount.done({
                params: action.payload,
                result: {
                    id: keyID,
                    encKey,
                    publicKey
                }
            }),
            modalShow({
                id: 'AUTH_ACCOUNT_CREATED',
                type: 'AUTH_ACCOUNT_CREATED',
                params: {
                    name: 'Stampify account',
                    account: addressString(keyID)
                }
            })
        );

    }).catch(e => Observable.of(restoreAccount.failed({
        params: null,
        error: 'E_IMPORT_FAILED'
    })));

export default restoreAccountEpic;