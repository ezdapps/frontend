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
import DnDComponent from './DnDComponent';
import EditableBlock from './EditableBlock';

class ImageInput extends EditableBlock {
    protected editableDisplay = 'inline';
    protected editable = false;
    renderChildren(classes: string) {
        return (
            <div
                className={classes}
            >
                <input type="text" className="form-control" readOnly={true}/>
                <div className="group-span-filestyle input-group-btn">
                    <button className="btn btn-default" type="button">
                        <span className="icon-span-filestyle glyphicon glyphicon-folder-open" />
                        <span className="buttonText" />
                    </button>
                </div>
            </div>
        );
    }
    getClasses() {
        return classnames({
            'b-selected': this.props.selected,
            'input-group': true
        });
    }
}

export default DnDComponent(ImageInput);