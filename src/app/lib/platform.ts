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

import { IInferredArguments } from 'apla/gui';

export type TPlatformType =
    'desktop' | 'web' | 'win32' | 'linux' | 'darwin';

const isElectron = navigator.userAgent.toLowerCase().indexOf(' electron/') > -1;
const platform: TPlatformType = isElectron ? 'desktop' : 'web';

let os: NodeJS.Platform = null;
let args: IInferredArguments = {};

if (isElectron) {
    const electron = require('electron');
    const process: NodeJS.Process = require('process');
    os = process.platform;
    args = electron.ipcRenderer.sendSync('getArgs') || {};
}

export default {
    // Platform.select will return only 1 value depending on which platform
    // this application runs. If 'desktop' is specified instead of providing
    // extact platform name - it will be returned instead
    select: function <T>(platforms: {
        desktop?: T,
        web?: T,
        win32?: T,
        linux?: T,
        darwin?: T
    }): T {
        if (isElectron && platforms[os]) {
            return platforms[os];
        }
        else {
            return platforms[platform];
        }
    },

    on: (platformType: TPlatformType, callback: () => void) => {
        if (platformType === platform) {
            callback();
        }
    },

    args
};