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
import EditableBlock, { IEditableBlockProps } from './EditableBlock';
import Switch from 'components/Main/Editor/Designer/Switch';

export class If extends EditableBlock {
    protected logic = true;
    protected editableDisplay = 'block';
    protected editable = false;
    constructor(props: IEditableBlockProps) {
        super(props);
        this.state = {
            condition: true
        };
    }

    toggleCondition() {
        this.setState({
            condition: !this.state.condition
        });
    }

    renderSwitch(tag: string) {
        return (
            <span style={{'backgroundColor': '#FFCC66'}}>{tag}
                <Switch
                    initialValue={this.state.condition}
                    onValue={true}
                    offValue={false}
                    onChange={this.toggleCondition.bind(this)}
                /> &#123;
            </span>
        );
    }

    renderChildren(classes: string) {
        return (
            <div
                className={classes}
            >
                {this.renderSwitch('If')}
                {this.state.condition && (<div>{this.props.children} </div>) || (<span>...</span>)}
                <span style={{'backgroundColor': '#FFCC66'}}>&#125;</span>
                {!this.state.condition && this.props.tail}
            </div>
        );
    }
}

export default DnDComponent(StyledComponent(If));