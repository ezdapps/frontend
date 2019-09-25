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

import { BrowserWindow, Menu } from 'electron';
import * as path from 'path';
import * as url from 'url';
import menu from '../menu';
import mainWindow from './main';

export let window: BrowserWindow;

const ENV = process.env.NODE_ENV || 'production';
const PROTOCOL = process.env.HTTPS === 'true' ? 'https' : 'http';
const PORT = parseInt(process.env.PORT || '', 10) || 3000;
const HOST = process.env.HOST || '127.0.0.1';

export const appUrl =
    ENV !== 'production'
        ? `${PROTOCOL}://${HOST}:${PORT}`
        : url.format({
            pathname: path.join(__dirname, '../../', 'app', 'index.html'),
            protocol: 'file:',
            slashes: true,
        });

export const spawnWindow = () => {
    let wnd: BrowserWindow = mainWindow();

    if (window) {
        window.close();
        window.destroy();
    }

    if (process.platform === 'darwin') {
        Menu.setApplicationMenu(menu);
        wnd.setMenu(menu);
    }

    wnd.loadURL(appUrl);

    wnd.on('closed', () => {
        window = null;
    });

    window = wnd;
};