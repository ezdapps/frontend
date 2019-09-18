/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { State } from '../reducer';
import { replaceAccount } from '../actions';
import { Reducer } from 'modules';

const replaceAccountHandler: Reducer<typeof replaceAccount, State> = (state, payload) => ({
    ...state,
    wallets: [
        payload
    ]
});

export default replaceAccountHandler;