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
import * as _ from 'lodash';

import StyledComponent from './StyledComponent';
import Validation from 'components/Validation';
import { Validator, IValidatorGenerator } from 'components/Validation/Validators';

export interface IInputProps {
    'className'?: string;
    'class'?: string;
    'disabled'?: string;
    'name'?: string;
    'placeholder'?: string;
    'type'?: string;
    'value'?: string;
    'validate'?: {
        [validator: string]: string
    };
}

// TODO: type is not handled correctly
const Input: React.SFC<IInputProps> = (props) => {
    const compiledValidators: Validator[] = [];
    const className = [props.class, props.className].join(' ');
    _.forEach(props.validate, (value, name) => {
        const validator = Validation.validators[name];
        if (validator) {
            if (validator instanceof Validator) {
                compiledValidators.push(validator);
            }
            else {
                const validatorGenerator: IValidatorGenerator = validator;
                compiledValidators.push(validatorGenerator(value));
            }
        }
    });

    switch (props.type) {
        case 'file':
            return (
                <Validation.components.ValidatedFile
                    disabled={!!props.disabled}
                    name={props.name}
                    placeholder={props.placeholder}
                    validators={compiledValidators}
                />
            );

        case 'checkbox':
            return (
                <Validation.components.ValidatedCheckbox
                    className={className}
                    disabled={!!props.disabled}
                    name={props.name}
                    title={props.placeholder}
                    defaultChecked={'true' === props.value}
                    validators={compiledValidators}
                />
            );

        case 'textarea':
            return (
                <Validation.components.ValidatedTextarea
                    className={className}
                    disabled={!!props.disabled}
                    name={props.name}
                    placeholder={props.placeholder}
                    defaultValue={props.value}
                    validators={compiledValidators}
                />
            );

        default:
            return (
                <Validation.components.ValidatedControl
                    className={className}
                    disabled={!!props.disabled}
                    name={props.name}
                    placeholder={props.placeholder}
                    type={props.type}
                    defaultValue={props.value}
                    validators={compiledValidators}
                />
            );
    }
};

export default StyledComponent(Input);