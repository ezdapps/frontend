// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

import { State } from '../reducer';
import { subscribe } from '../actions';
import { Reducer } from 'modules';
import { IAccount } from 'apla/api';
import { INotificationsMessage } from 'apla/socket';

const flattenNotifications = (id: string, info: IAccount) => {
    const stack: INotificationsMessage[] = [];
    info.access.forEach(ecosystem => {
        ecosystem.notifications.forEach(notification => {
            stack.push({
                id,
                ecosystem: ecosystem.ecosystem,
                role: notification.role_id,
                count: Number(notification.count)
            });
        });
    });

    return stack;
};

const subscribeHandler: Reducer<typeof subscribe.started, State> = (state, payload) => ({
    ...state,
    notifications: [
        ...state.notifications.filter(l => l.id !== payload.id),
        ...flattenNotifications(payload.id, payload)
    ]
});

export default subscribeHandler;