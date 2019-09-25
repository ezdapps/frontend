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
import { FormGroup, FormGroupProps } from 'react-bootstrap';
import * as propTypes from 'prop-types';

import ValidatedForm from './ValidatedForm';

interface IValidatedFormGroupProps extends FormGroupProps {
    for: string;
}

export default class ValidatedFormGroup extends React.Component<IValidatedFormGroupProps> {
    render() {
        const valid = this.context.form ? (this.context.form as ValidatedForm).getState(this.props.for) : true;
        return (
            <FormGroup
                className={this.props.className}
                validationState={valid ? null : 'error'}
                bsClass={this.props.bsClass}
                bsSize={this.props.bsSize}
                controlId={this.props.controlId}
            >
                {this.props.children}
            </FormGroup >
        );
    }
}

(ValidatedFormGroup as React.ComponentClass).contextTypes = {
    form: propTypes.instanceOf(ValidatedForm)
};