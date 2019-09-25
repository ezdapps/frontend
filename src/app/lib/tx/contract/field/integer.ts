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

import IField from './';
import { Int64BE } from 'int64-buffer';

class Integer implements IField<Int64BE | string | number, Int64BE> {
    private _value: Int64BE = new Int64BE();

    set(value: Int64BE | string | number) {
        if (!value) {
            this._value = new Int64BE();
        }
        else if ('string' === typeof value) {
            this._value = new Int64BE(value);
        }
        else if ('number' === typeof value) {
            this._value = new Int64BE(value);
        }
        else {
            this._value = value;
        }
    }

    get(): Int64BE {
        return this._value;
    }

    toString() {
        return this._value.toString();
    }
}

export default Integer;