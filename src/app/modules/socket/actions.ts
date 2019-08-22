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
import { IWallet } from 'apla/auth';
import { INotificationsMessage, IConnectCall } from 'apla/socket';
import { IAccount } from 'apla/api';
import Centrifuge from 'centrifuge';

const actionCreator = actionCreatorFactory('socket');
export const connect = actionCreator.async<IConnectCall, { session: string, instance: Centrifuge }, string>('CONNECT');
export const disconnect = actionCreator.async('DISCONNECT');
export const subscribe = actionCreator.async<IAccount, any, string>('SUBSCRIBE');
export const unsubscribe = actionCreator.async<IWallet, void, void>('UNSUBSCRIBE');
export const setNotifications = actionCreator<INotificationsMessage[]>('SET_NOTIFICATIONS');
export const setNotificationsCount = actionCreator<INotificationsMessage>('SET_NOTIFICATIONS_COUNT');
export const setConnected = actionCreator<boolean>('SET_CONNECTED');