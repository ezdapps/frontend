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

import * as actions from './actions';
import { reducerWithInitialState } from 'typescript-fsa-reducers/dist';
import { INotification } from 'apla/notifications';
import spawnNotificationHandler from './reducers/spawnNotificationHandler';
import destroyNotificationHandler from './reducers/destroyNotificationHandler';
import pushNotificationQueueHandler from './reducers/pushNotificationQueueHandler';

export type State = {
    NOTIFICATIONS_PER_SCREEN: number;
    queue: INotification[];
    notifications: INotification[];
};

export const initialState: State = {
    NOTIFICATIONS_PER_SCREEN: 3,
    queue: [],
    notifications: []
};

export default reducerWithInitialState<State>(initialState)
    .case(actions.destroyNotification, destroyNotificationHandler)
    .case(actions.pushNotificationQueue, pushNotificationQueueHandler)
    .case(actions.spawnNotification, spawnNotificationHandler);