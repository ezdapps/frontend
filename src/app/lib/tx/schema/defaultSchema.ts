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

import { ISchema } from './';
import Boolean from '../contract/field/boolean';
import Integer from '../contract/field/integer';
import Float from '../contract/field/float';
import Money from '../contract/field/money';
import String from '../contract/field/string';
import File from '../contract/field/file';
import StringCollection from '../contract/field/stringCollection';

const defaultSchema: ISchema = {
    header: new Uint8Array([0x80]),
    fields: {
        'bool': Boolean,
        'int': Integer,
        'float': Float,
        'money': Money,
        'string': String,
        'file': File,
        'array': StringCollection,
    }
};

export default defaultSchema;