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
import { ISession, INetwork } from 'apla/auth';
import NetworkError from 'services/network/errors';
import { IFatalError, ILocale } from 'apla';
import { reducerWithInitialState } from 'typescript-fsa-reducers/dist';
import initializeDoneHandler from './reducers/initializeDoneHandler';
import setLocaleDoneHandler from './reducers/setLocaleDoneHandler';
import discoverNetworkHandler from './reducers/discoverNetworkHandler';
import discoverNetworkDoneHandler from './reducers/discoverNetworkDoneHandler';
import discoverNetworkFailedHandler from './reducers/discoverNetworkFailedHandler';
import addNetworkHandler from './reducers/addNetworkHandler';
import addNetworkDoneHandler from './reducers/addNetworkDoneHandler';
import initializeFailedHandler from './reducers/initializeFailedHandler';
import addNetworkFailedHandler from './reducers/addNetworkFailedHandler';

export type State = {
    readonly networkError: NetworkError;
    readonly fatalError?: IFatalError;
    readonly guestSession: ISession;
    readonly localeMessages: { [key: string]: string };
    readonly isLoaded: boolean;
    readonly isConnecting: boolean;
    readonly preconfiguredNetworks: INetwork[];
    readonly locales: ILocale[];
    readonly locale: string;
};

export const initialState: State = {
    networkError: null,
    fatalError: null,
    guestSession: null,
    localeMessages: {},
    isLoaded: false,
    isConnecting: false,
    preconfiguredNetworks: [],
    locales: [],
    locale: null
};

export default reducerWithInitialState<State>(initialState)
    .case(actions.initialize.done, initializeDoneHandler)
    .case(actions.initialize.failed, initializeFailedHandler)
    .case(actions.setLocale.done, setLocaleDoneHandler)
    .case(actions.discoverNetwork.started, discoverNetworkHandler)
    .case(actions.discoverNetwork.done, discoverNetworkDoneHandler)
    .case(actions.discoverNetwork.failed, discoverNetworkFailedHandler)
    .case(actions.addNetwork.started, addNetworkHandler)
    .case(actions.addNetwork.done, addNetworkDoneHandler)
    .case(actions.addNetwork.failed, addNetworkFailedHandler);