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

import actionCreatorFactory from 'typescript-fsa';
import { push } from 'connected-react-router';
import NetworkError from 'services/network/errors';
import { ISession, INetwork } from 'apla/auth';
import { IFatalError, ILocale } from 'apla';

const actionCreator = actionCreatorFactory('engine');
export const navigate = (url: string) => push(url);
export const initialize = actionCreator.async<{}, { defaultNetwork: string, txViewerUrl?: string, preconfiguredNetworks: INetwork[], locales: ILocale[] }, IFatalError>('INITIALIZE');
export const discoverNetwork = actionCreator.async<{ uuid: string }, { session: ISession }, NetworkError>('DISCOVER_NETWORK');
export const addNetwork = actionCreator.async<{ name: string, networkID?: number, apiHost: string }, void>('ADD_NETWORK');
export const setLocale = actionCreator.async<string, { locale: string, values: { [key: string]: string } }>('SET_LOCALE');