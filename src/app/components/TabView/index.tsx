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
import styled from 'styled-components';

const Tab = styled.div`
    overflow-y: auto;
`;

export interface ITabViewProps {
    tabs: string[];
    children: JSX.Element[];
    className?: string;
    tabsClassName?: string;
    wrapperClassName?: string;
    paneClassName?: string;
}

interface ITabViewState {
    tabIndex: number;
}

export default class TabView extends React.Component<ITabViewProps, ITabViewState> {
    constructor(props: ITabViewProps) {
        super(props);
        this.state = {
            tabIndex: 0
        };
    }

    onTabSwitch(tabIndex: number) {
        this.setState({
            tabIndex
        });
    }

    render() {
        return (
            <Tab className={`${this.props.wrapperClassName || ''}`}>
                <ul className={`nav nav-tabs ${this.props.tabsClassName || ''}`}>
                    {this.props.tabs.map((tab, index) => (
                        <li key={index} className={`uib-tab ${index === this.state.tabIndex ? 'active' : ''}`}>
                            <a href="javascript:void(0)" onClick={this.onTabSwitch.bind(this, index)}>{tab}</a>
                        </li>
                    ))}
                </ul>
                <div className={`tab-content ${this.props.className || ''}`}>
                    {this.props.children.map((element, index) => (
                        <div key={index} className={`tab-pane ${this.props.paneClassName || ''} ${this.state.tabIndex === index ? 'active' : ''}`}>
                            {element}
                        </div>
                    ))}
                </div>
            </Tab>
        );
    }
}