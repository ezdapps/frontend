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
import RadioButton from './RadioButton';

import imgItalic from 'images/constructor/group-15.svg';
import imgBold from 'images/constructor/group-16.svg';

interface IFormatButtonsProps {
    tag: string;
    onClick?: any;
}

export default class FormatButtons extends React.Component<IFormatButtonsProps> {
    render() {
        return (
            <div>
                {this.props.tag !== 'strong' && (
                    <RadioButton onClick={this.props.onClick.bind(this, 'bold')} value="bold" title="make selected text bold">
                        <img src={imgBold}/>
                    </RadioButton>
                )}

                {this.props.tag !== 'em' && (
                    <RadioButton onClick={this.props.onClick.bind(this, 'italic')} value="italic" title="make selected text italic">
                        <img src={imgItalic}/>
                    </RadioButton>
                )}

                <RadioButton onClick={this.props.onClick.bind(this, 'removeFormat')} value="removeFormat" title="remove formatting on selected text">
                    <span>&times;</span>
                </RadioButton>
            </div>
        );
    }
}