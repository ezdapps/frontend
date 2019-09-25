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

import { Action } from 'redux';
import { Epic as NativeEpic } from 'redux-observable';
import { IStoreDependencies } from './dependencies';
import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import * as auth from './auth';
import * as content from './content';
import * as sections from './sections';
import * as modal from './modal';
import * as engine from './engine';
import * as editor from './editor';
import * as tx from './tx';
import * as io from './io';
import * as notifications from './notifications';
import * as storage from './storage';
import * as socket from './socket';
import * as router from './router';
import { ActionCreator, Failure, Success } from 'typescript-fsa';

export type Epic = NativeEpic<Action, IRootState, IStoreDependencies>;
export type Reducer<T, S> =
    T extends ActionCreator<Failure<infer P, infer E>> ? (state: S, payload: Failure<P, E>) => S :
    T extends ActionCreator<Success<infer P, infer R>> ? (state: S, payload: Success<P, R>) => S :
    T extends ActionCreator<infer R> ? (state: S, payload: R) => S :
    (state: S, payload: T) => S;

export interface IRootState {
    auth: auth.State;
    content: content.State;
    sections: sections.State;
    modal: modal.State;
    engine: engine.State;
    editor: editor.State;
    tx: tx.State;
    io: io.State;
    notifications: notifications.State;
    storage: storage.State;
    socket: socket.State;
    router: router.State;
}

export const rootEpic = combineEpics(
    auth.epic,
    content.epic,
    sections.epic,
    modal.epic,
    engine.epic,
    editor.epic,
    tx.epic,
    io.epic,
    notifications.epic,
    storage.epic,
    socket.epic,
    router.epic
);

export default combineReducers<IRootState>({
    auth: auth.reducer,
    content: content.reducer,
    sections: sections.reducer,
    modal: modal.reducer,
    engine: engine.reducer,
    editor: editor.reducer,
    tx: tx.reducer,
    notifications: notifications.reducer,
    storage: storage.reducer,
    socket: socket.reducer,
    router: router.reducer
});