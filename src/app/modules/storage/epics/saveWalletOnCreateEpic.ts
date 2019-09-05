/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Epic } from 'modules';
import { saveWallet } from '../actions';
import { createWallet, createAccount } from 'modules/auth/actions';
import { isType } from 'typescript-fsa';

const saveWalletOnCreateEpic: Epic =
    (action$, store) => action$.filter(action => isType(action, createWallet.done) || isType(action, createAccount.done))
        .map((action: any) =>
            saveWallet(action.payload.result)
        );

export default saveWalletOnCreateEpic;