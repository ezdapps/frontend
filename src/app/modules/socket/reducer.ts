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

import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as actions from './actions';
import { INotificationsMessage } from 'apla/socket';
import { IWallet } from 'apla/auth';
import connectDoneHandler from './reducers/connectDoneHandler';
import disconnectDoneHandler from './reducers/disconnectDoneHandler';
import subscribeDoneHandler from './reducers/subscribeDoneHandler';
import setNotificationsCountHandler from './reducers/setNotificationsCountHandler';
import unsubscribeDoneHandler from './reducers/unsubscribeDoneHandler';
import setConnectedHandler from './reducers/setConnectedHandler';
import subscribeHandler from './reducers/subscribeHandler';

export type State = {
    readonly session: string;
    readonly socket: ICentrifuge;
    readonly connected: boolean;
    readonly notifications: INotificationsMessage[];
    readonly subscriptions: {
        wallet: IWallet;
        instance: ISubscription;
    }[];
};

export const initialState: State = {
    session: null,
    socket: null,
    connected: false,
    notifications: [],
    subscriptions: []
};

export default reducerWithInitialState<State>(initialState)
    .case(actions.connect.done, connectDoneHandler)
    .case(actions.disconnect.done, disconnectDoneHandler)
    .case(actions.setNotificationsCount, setNotificationsCountHandler)
    .case(actions.setConnected, setConnectedHandler)
    .case(actions.subscribe.started, subscribeHandler)
    .case(actions.subscribe.done, subscribeDoneHandler)
    .case(actions.unsubscribe.done, unsubscribeDoneHandler);