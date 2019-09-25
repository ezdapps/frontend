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
import RadioButtonColor from './RadioButtonColor';

interface IRadioButtonsProps {
    onSelect?: any;
    initialValue?: string;
}

interface IRadioButtonsState {
    value: string;
}

export default class RadioButtons extends React.Component<IRadioButtonsProps, IRadioButtonsState> {

    constructor(props: IRadioButtonsProps) {
        super(props);
        this.state = {
            value: props.initialValue || ''
        };
    }

    componentWillReceiveProps(props: IRadioButtonsProps) {
        if (this.state.value !== props.initialValue) {
            this.setState({
                value: props.initialValue
            });
        }
    }

    render() {
        return (
            <div>
                <RadioButtonColor value="basic" onClick={this.selectRadio.bind(this, 'basic')} selectedValue={this.state.value}/>
                <RadioButtonColor value="primary" onClick={this.selectRadio.bind(this, 'primary')} selectedValue={this.state.value}/>
                <RadioButtonColor value="success" onClick={this.selectRadio.bind(this, 'success')} selectedValue={this.state.value}/>
                <RadioButtonColor value="info" onClick={this.selectRadio.bind(this, 'info')} selectedValue={this.state.value}/>
                <RadioButtonColor value="warning" onClick={this.selectRadio.bind(this, 'warning')} selectedValue={this.state.value}/>
                <RadioButtonColor value="danger" onClick={this.selectRadio.bind(this, 'danger')} selectedValue={this.state.value}/>
                <RadioButtonColor value="link" onClick={this.selectRadio.bind(this, 'link')} selectedValue={this.state.value}/>
            </div>
        );
    }
    selectRadio(value: string) {
        let newValue: string = (value === this.state.value ? '' : value);
        this.setState({
            value: newValue
        });
        if (this.props.onSelect) {
            this.props.onSelect(newValue);
        }
    }
}
