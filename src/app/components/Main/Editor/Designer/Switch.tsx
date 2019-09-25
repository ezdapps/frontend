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
import imgSwitchOn from 'images/constructor/group-18.svg';
import imgSwitchOff from 'images/constructor/group-29.svg';

interface ISwitchProps {
    onChange?: any;
    initialValue?: any;
    onValue: any;
    offValue: any;
}

interface ISwitchState {
    on: boolean;
}

const ImgSwitch = styled.img`
    width: 30px;
`;

export default class Switch extends React.Component<ISwitchProps, ISwitchState> {

    constructor(props: ISwitchProps) {
        super(props);
        this.state = {
            on: this.getBoolean(props.initialValue)
        };
    }

    getBoolean(value: string): boolean {
        return ((value === this.props.onValue) ? true : false);
    }

    componentWillReceiveProps(props: ISwitchProps) {
        if (this.state.on !== this.getBoolean(props.initialValue)) {
            this.setState({
                on: this.getBoolean(props.initialValue)
            });
        }
    }

    render() {
        return (
            <div className="b-switch" onClick={this.change.bind(this)}>
                <ImgSwitch src={this.state.on ? imgSwitchOn : imgSwitchOff} />
            </div>
        );
    }
    change() {
        let on: boolean = !this.state.on;
        this.setState({
            on
        });
        if (this.props.onChange) {
            this.props.onChange((on ? this.props.onValue : this.props.offValue));
        }
    }
}
