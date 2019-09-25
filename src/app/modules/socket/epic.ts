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

import { combineEpics } from 'redux-observable';
import connectEpic from './epics/connectEpic';
import disconnectEpic from './epics/disconnectEpic';
import subscribeEpic from './epics/subscribeEpic';
import unsubscribeEpic from './epics/unsubscribeEpic';
import subscribeWalletsEpic from './epics/subscribeWalletsEpic';
import subscribeReconnectEpic from './epics/subscribeReconnectEpic';
import unsubscribeRemovedWalletEpic from './epics/unsubscribeRemovedWalletEpic';
import subscribeWalletEpic from './epics/subscribeWalletEpic';
import initConnectEpic from './epics/initConnectEpic';

export default combineEpics(
    connectEpic,
    disconnectEpic,
    subscribeEpic,
    unsubscribeEpic,
    subscribeWalletsEpic,
    subscribeWalletEpic,
    subscribeReconnectEpic,
    unsubscribeRemovedWalletEpic,
    initConnectEpic
);