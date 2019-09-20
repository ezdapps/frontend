/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Epic } from 'modules';
import { Observable } from 'rxjs/Observable';
import { accountProcess, createAccount } from '../actions';
import keyring from 'lib/keyring';

const accountProcessEpic: Epic = action$ =>
    action$.ofAction(accountProcess).flatMap(action => {
        const seed = keyring.generateSeed();
        const keys = keyring.generateKeyPair(seed);

        const form = new URLSearchParams();
        form.append('pub', keys.public);
        form.append('email', action.payload.email);
        form.append('name', action.payload.firstName);
        form.append('surname', action.payload.lastName);

        return Observable.from(
            fetch('https://lhoft.apla.io/request/add', {
                method: 'post',
                body: form
            })
        )
            .map(() =>
                createAccount.started({
                    keys,
                    password: action.payload.password
                })
            )
            .catch(e => Observable.empty<never>());
    });

export default accountProcessEpic;
