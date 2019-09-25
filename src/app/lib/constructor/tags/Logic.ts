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

import { TProtypoElement } from 'apla/protypo';
import Tag from './Tag';
import getParamName, { getLogicTagName } from 'lib/constructor/tags/params';

class Logic extends Tag {
    constructor(element: TProtypoElement) {
        super(element);
        this.tagName = getLogicTagName(element.tag);
        this.canHaveChildren = false;
        this.logic = true;
        this.attr = {
        };
        this.editProps = [];
        for (let attr in element.attr) {
            if (element.attr.hasOwnProperty(attr)) {
                this.attr[attr] = getParamName(attr);
                this.editProps.push(attr);
            }
        }
    }
}

export default Logic;