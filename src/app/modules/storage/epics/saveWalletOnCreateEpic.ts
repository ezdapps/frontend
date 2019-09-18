/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Epic } from 'modules';
import { saveWallet } from '../actions';
import { createWallet } from 'modules/auth/actions';

const saveWalletOnCreateEpic: Epic =
    (action$, store) => action$.ofAction(createWallet.done)
        .map((action: any) =>
            saveWallet(action.payload.result)
        );

export default saveWalletOnCreateEpic;