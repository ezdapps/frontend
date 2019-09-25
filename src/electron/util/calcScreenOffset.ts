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

import { screen, Rectangle } from 'electron';
import args from '../args';

export default function calcScreenOffset(sourceRect: { width: number, height: number }): Rectangle {
    const x = args.offsetX;
    const y = args.offsetY;

    if (x === x && y === y) {
        const primaryDisplay = screen.getPrimaryDisplay();
        const resultX = Math.round((primaryDisplay.workArea.width / 2) - (sourceRect.width / 2) + x);
        const resultY = Math.round((primaryDisplay.workArea.height / 2) - (sourceRect.height / 2) + y);

        return {
            x: resultX,
            y: resultY,
            width: sourceRect.width,
            height: sourceRect.height
        };
    }
    else {
        return {
            x: null,
            y: null,
            width: sourceRect.width,
            height: sourceRect.height
        };
    }
}