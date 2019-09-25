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

import { BrowserWindow, shell } from 'electron';
import config from '../config';
import calcScreenOffset from '../util/calcScreenOffset';

export default () => {
    const options = {
        minWidth: 800,
        minHeight: 600,
        frame: false,
        backgroundColor: '#272D44',
        resizable: true,
        show: false,
        maximized: config.get('maximized') || false,
        ...calcScreenOffset(config.get('dimensions') || { width: 800, height: 600 })
    };

    const window = new BrowserWindow(options);

    window.once('ready-to-show', () => {
        window.show();
    });

    window.on('close', () => {
        config.set('dimensions', window.getBounds());
        config.set('maximized', window.isMaximized() || window.isMaximized);
    });

    window.webContents.on('new-window', (event, url) => {
        event.preventDefault();
        shell.openExternal(url);
    });

    return window;
};