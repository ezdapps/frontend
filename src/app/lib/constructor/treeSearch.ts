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
import { IFindTagResult } from 'apla/editor';

class TreeSearch {
    private findTagByIdResult: IFindTagResult = {
        el: null,
        parent: null,
        parentPosition: 0,
        tail: false
    };

    public findTagById(elements: TProtypoElement[], id: string): IFindTagResult {
        this.findTagByIdResult.el = null;
        this.findNextTagInArrayById(elements, id, null, false);
        return this.findTagByIdResult;
    }

    private findNextTagById(el: any, id: string, parent: TProtypoElement, tail: boolean): void {
        if (el.id === id) {
            this.findTagByIdResult.el = el;
            return;
        }

        this.findNextTagInArrayById(el.children, id, el, false);
        this.findNextTagInArrayById(el.tail, id, el, true);
    }

    private findNextTagInArrayById(el: TProtypoElement[], id: string, parent: TProtypoElement, tail: boolean): void {
        for (var i = 0; el && i < el.length; i++) {
            if (this.findTagByIdResult.el) {
                break;
            }
            this.findTagByIdResult.parent = parent;
            this.findTagByIdResult.parentPosition = i;
            this.findTagByIdResult.tail = tail;
            this.findNextTagById(el[i], id, parent, false);
        }
    }
}

export default TreeSearch;