/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

require('module').globalPaths.push(__dirname);

import { app } from 'electron';
import { spawnWindow, window } from './windows/index';

app.on('ready', () => {
    spawnWindow();
});

app.on('window-all-closed', () => {
    if ('darwin' !== process.platform) {
        app.quit();
    }
});

app.on('activate', () => {
    if (null === window) {
        spawnWindow();
    }
});