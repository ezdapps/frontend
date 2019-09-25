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

import Long from 'long';

export enum CRC64Type {
    ECMA182 = '0xC96C5795D7870F42',
    ISO3309 = '0xD800000000000000'
}

const LONG_255 = Long.fromInt(0xff);

const makeTable = (poly: Long) => {
    let crcTable = [];
    let crc;
    for (let i = 0; i < 256; i++) {
        crc = Long.fromInt(i, true);
        for (let j = 0; j < 8; j++) {
            if (crc.and(Long.ONE).eq(Long.ONE)) {
                crc = crc.shiftRightUnsigned(1);
                crc = crc.xor(poly);
            }
            else {
                crc = crc.shiftRightUnsigned(1);
            }
        }
        crcTable[i] = crc;
    }
    return crcTable;
};

const makeCRC = function (table: Long[], value: number[]) {
    var crc = Long.MAX_UNSIGNED_VALUE;
    for (let i = 0; i < value.length; i++) {
        const lookup = table[crc.xor(value[i]).and(LONG_255).toString()];
        crc = crc.shiftRightUnsigned(8).xor(lookup);
    }
    return crc.xor(Long.MAX_UNSIGNED_VALUE);
};

const _CRC64_TABLE = makeTable(Long.fromString(CRC64Type.ECMA182, false, 16));

export default (input: number[]) =>
    makeCRC(_CRC64_TABLE, input).toString(10);