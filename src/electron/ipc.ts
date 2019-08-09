/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

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

    return {
        storage: value.storage,
        engine: {
            guestSession: value.engine.guestSession,
        },
        auth: {
            isAuthenticated: value.auth.isAuthenticated,
            isDefaultWallet: value.auth.isDefaultWallet,
            session: value.auth.session,
            id: value.auth.id,
            wallet: value.auth.wallet
        }
    };
};

if (!args.dry) {
    try {
        state = config.get('persistentData');
    }
    catch {
        // Suppress errors
    }

    saveState = _.throttle(() => {
        config.set('persistentData', truncateState(state));
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