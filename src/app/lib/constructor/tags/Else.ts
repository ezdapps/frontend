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

import Tag from './Tag';

class Else extends Tag {

    protected tagName: string = 'Else';
    public logic: boolean = true;
    public canMove: boolean = false;
    public canCopy: boolean = false;
    public canChangePosition: boolean = false;
    protected bodyInline = false;
    protected attr: any = {
    };
    protected editProps: string[] = [];
    protected generateTextElement: boolean = false;

    renderCode(): string {

        if (this.element.children && this.element.children.length === 0) {
            return '';
        }

        let result: string = '.' + this.tagName;
        let body = this.renderChildren(this.element.children, this.offset);

        result += this.renderBody(body);
        return result;
    }
}

export default Else;