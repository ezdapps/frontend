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