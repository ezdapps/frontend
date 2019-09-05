/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { State } from '../reducer';
import { loginAccount } from '../actions';
import { Reducer } from 'modules';

const loginAccountDoneHandler: Reducer<typeof loginAccount.done, State> = (state, payload) => ({
    ...state,
    isAuthenticated: true,
    isLoggingIn: false,
    wallet: payload.result.context,
    session: payload.result.session,
    privateKey: payload.result.privateKey,
    id: payload.params.account.id,
    isDefaultWallet: false
});

export default loginAccountDoneHandler;