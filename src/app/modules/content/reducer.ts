/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as actions from './actions';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { TProtypoElement } from 'apla/protypo';
import fetchNotificationsDoneHandler from './reducers/fetchNotificationsDoneHandler';
import ecosystemInitHandler from './reducers/ecosystemInitHandler';
import reloadStylesheetHandler from './reducers/reloadStylesheetHandler';
import setMenuActiveHandler from './reducers/setMenuActiveHandler';

export type State = {
    readonly stylesheet: string;
    readonly printStylesheet: string;
    readonly notifications: TProtypoElement[];
    readonly menuActive: boolean;
};

export const initialState: State = {
    stylesheet: null,
    printStylesheet: null,
    notifications: null,
    menuActive: false
};

export default reducerWithInitialState(initialState)
    .case(actions.ecosystemInit, ecosystemInitHandler)
    .case(actions.fetchNotifications.done, fetchNotificationsDoneHandler)
    .case(actions.reloadStylesheet, reloadStylesheetHandler)
    .case(actions.setMenuActive, setMenuActiveHandler);