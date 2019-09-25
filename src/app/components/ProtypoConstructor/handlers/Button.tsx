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
import StyledComponent from 'components/Protypo/handlers/StyledComponent';
import DnDComponent from './DnDComponent';
import ContentEditable from 'react-contenteditable';
import EditableBlock from './EditableBlock';

class Button extends EditableBlock {
    protected editableTag = 'span';
    protected editableDisplay = 'inline';
    protected renderTag = 'button';

    contentEditable(tagName: string, classes: string) {
        return (
            <button
                className={classes}
            >
                <ContentEditable
                    tagName={tagName}
                    html={this.props.childrenText}
                    onChange={this.handleChange.bind(this)}
                />
            </button>
        );
    }
}

export default DnDComponent(StyledComponent(Button));
