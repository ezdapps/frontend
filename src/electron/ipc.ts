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

import { ipcMain, Event } from 'electron';
import config from './config';
import args from './args';
import * as _ from 'lodash';

export let state: any = null;
let saveState = () => null as any;

const truncateState = (value: any) => {
    if (!value) {
        return value;
    }

    const storage = value.storage || {};
    const engine = value.engine || {};
    const auth = value.auth || {};

    return {
        storage,
        engine: {
            guestSession: engine.guestSession,
        },
        auth: {
            isAuthenticated: auth.isAuthenticated,
            isDefaultWallet: auth.isDefaultWallet,
            session: auth.session,
            id: auth.id,
            wallet: auth.wallet
        }
    };
};

if (!args.dry) {
    try {
        state = JSON.parse(config.get('persistentData'));
    }
    catch {
        // Suppress errors
    }

    saveState = _.throttle(() => {
        config.set('persistentData', JSON.stringify(truncateState(state)));
    }, 1000, { leading: true });
}

ipcMain.on('setState', (e: Event, updatedState: any) => {
    state = updatedState;
    saveState();
});

ipcMain.on('getState', (e: Event) => {
    e.returnValue = truncateState(state);
});

ipcMain.on('getArgs', (e: Event) => {
    e.returnValue = args;
});