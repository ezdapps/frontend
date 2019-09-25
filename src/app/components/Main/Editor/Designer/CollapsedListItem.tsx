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

interface ICollapsedListItemProps {
    text: string;
    icon?: string;
}

interface ICollapsedListItemState {
    collapsed: boolean;
}

export default class CollapsedListItem extends React.Component<ICollapsedListItemProps, ICollapsedListItemState> {

    constructor(props: ICollapsedListItemProps) {
        super(props);
        this.state = {
            collapsed: true
        };
    }
    render() {
        const classes = classnames({
            collapsed: this.state.collapsed
        });

        return (
            <li className={classes}>
                <div onClick={this.toggleCollapsed.bind(this)}>
                    <img src={this.props.icon} />
                    {this.props.text}
                </div>
                {this.props.children}
            </li>
        );
    }
    toggleCollapsed() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }
}