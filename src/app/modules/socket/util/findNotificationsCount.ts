/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { State } from 'modules/socket';
import { IAccountContext } from 'apla/auth';
import findNotifications from './findNotifications';

const findNotificationsCount = (state: State, session: IAccountContext) => {
    const notifications = findNotifications(state, session);

    if (!notifications.length) {
        return 0;
    }

    return notifications
        .map(notification => notification.count)
        .reduce((a, b) => a + b);
};

export default findNotificationsCount;