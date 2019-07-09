/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { State } from '../reducer';
import { subscribe } from '../actions';
import { Reducer } from 'modules';

const subscribeHandler: Reducer<typeof subscribe.started, State> = (state, payload) => ({
    ...state,
    notifications: [
        ...state.notifications.filter(l => l.id !== payload.id),
        ...payload.access.map(ecosystem => Array.prototype.concat.apply([], ecosystem.notifications.map(
            notification => ({
                ecosystem: ecosystem.ecosystem,
                role: notification.role_id,
                count: notification.count
            }))
        ))
    ]
});

export default subscribeHandler;