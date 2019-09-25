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
import { Validator } from './Validators';
import * as propTypes from 'prop-types';

import ValidatedForm, { IValidatedControl } from './ValidatedForm';

export interface IValidatedTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    name: string;
    validators?: Validator[];
}

interface IValidatedTextareaState {
    value: string;
}

export default class ValidatedTextarea extends React.Component<IValidatedTextareaProps, IValidatedTextareaState> implements IValidatedControl {
    constructor(props: IValidatedTextareaProps) {
        super(props);

        this.state = {
            value: (props.value || props.defaultValue || '') as string
        };
    }

    componentDidMount() {
        if (this.context.form) {
            (this.context.form as ValidatedForm)._registerElement(this);
        }
    }

    componentWillUnmount() {
        if (this.context.form) {
            (this.context.form as ValidatedForm)._unregisterElement(this);
        }
    }

    componentWillReceiveProps(props: IValidatedTextareaProps) {
        if (this.props.value !== props.value) {
            this.setState({
                value: props.value as string
            });
            (this.context.form as ValidatedForm).updateState(props.name, props.value);
        }
    }

    getValue() {
        return this.state.value;
    }

    onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({
            value: (e.target as any).value
        });

        if (this.props.onChange) {
            this.props.onChange(e);
        }

        (this.context.form as ValidatedForm).emitUpdate(this.props.name, e.target.value);
    }

    onBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        (this.context.form as ValidatedForm).updateState(this.props.name);

        if (this.props.onBlur) {
            this.props.onBlur(e);
        }
    }

    render() {
        return (
            <textarea
                id={this.props.id}
                className={`form-control ${this.props.className || ''}`}
                placeholder={this.props.placeholder}
                value={this.state.value}
                onChange={this.onChange}
                onBlur={this.onBlur}
            />
        );
    }
}

(ValidatedTextarea as React.ComponentClass).contextTypes = {
    form: propTypes.instanceOf(ValidatedForm)
};