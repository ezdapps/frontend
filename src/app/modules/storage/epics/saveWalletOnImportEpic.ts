/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Epic } from 'modules';
import { importWallet, restoreAccount } from 'modules/auth/actions';
import { saveWallet } from '../actions';
import { isType } from 'typescript-fsa';

const saveWalletOnImportEpic: Epic = 
    (action$, store) => action$.filter(action => isType(action, importWallet.done) || isType(action, restoreAccount.done))
        .map((action: any) =>
            saveWallet(action.payload.result)
        );

export default saveWalletOnImportEpic;