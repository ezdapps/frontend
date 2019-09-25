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

import * as React from 'react';
import * as classnames from 'classnames';
import StyledComponent from 'components/Protypo/handlers/StyledComponent';
import DnDComponent from './DnDComponent';
import EditableBlock from './EditableBlock';

class Table extends EditableBlock {
    protected editableDisplay = 'block';
    protected editable = false;
    getClasses() {
        return classnames({
            'table': true,
            [this.props.className]: true,
            'b-selected': this.props.selected
        });
    }

    renderChildren(classes: string) {
        return (
            <table
                className={classes}
            >
                <thead>
                <tr>
                    <th>Column 1</th>
                    <th>Column 2</th>
                    <th>Column 3</th>
                </tr>
                </thead>
                <tbody>
                {this.renderRow(1)}
                {this.renderRow(2)}
                {this.renderRow(3)}
                </tbody>
            </table>
        );
    }

    renderRow(row: number) {
        return (
            <tr>
                <td>
                    Row {row}
                </td>
                <td>
                    Value 1
                </td>
                <td>
                    Value 2
                </td>
            </tr>
        );
    }
}

export default DnDComponent(StyledComponent(Table));