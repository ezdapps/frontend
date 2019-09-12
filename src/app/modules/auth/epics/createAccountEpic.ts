/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Epic } from 'modules';
import { Observable } from 'rxjs/Observable';
import { createWallet, createAccount } from '../actions';
import keyring from 'lib/keyring';
import { publicToID, addressString } from 'lib/crypto';
import { modalShow } from 'modules/modal/actions';

const createAccountEpic: Epic = action$ => action$.ofAction(createAccount.started)
    .flatMap(action => {
        const seed = keyring.generateSeed();
        const keys = keyring.generateKeyPair(seed);
        const publicKey = keyring.generatePublicKey(keys.private);
        const encKey = keyring.encryptAES(keys.private, action.payload);
        const keyID = publicToID(keys.public);

        return Observable.concat(
            Observable.of(createAccount.done({
                params: action.payload,
                result: {
                    id: keyID,
                    encKey,
                    publicKey
                }
            })),
            Observable.of(modalShow({
                id: 'AUTH_ACCOUNT_CREATED',
                type: 'AUTH_ACCOUNT_CREATED',
                params: {
                    name: 'Stampify account',
                    account: addressString(keyID)
                }
            }))
        );

    }).catch(e => Observable.of(createWallet.failed({
        params: null,
        error: 'E_IMPORT_FAILED'
    })));

export default createAccountEpic;