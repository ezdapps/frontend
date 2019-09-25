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

import React from 'react';

import { ModalContainer, IModalProps } from '../';
import ModalWindow from 'containers/Modal/ModalWindow';
import Button from 'components/Button/Button';
import Validation from 'components/Validation';
import Label from 'components/Form/Label';
import ValidatedForm from 'components/Validation/ValidatedForm';

interface Params {
    password: string;
}

class AccountProcessModal extends ModalContainer<
    IModalProps<Params, { email: string; firstName: string; lastName: string }>
> {
    public static className = ' ';

    private _form: ValidatedForm;

    handleSubmit = () => {
        const values = this._form.validateAll();

        if (values.valid) {
            this.props.onResult({
                email: values.payload.email.value,
                firstName: values.payload.firstName.value,
                lastName: values.payload.lastName.value
            });
        }
    }

    render() {
        return (
            <ModalWindow
                title="Create or Recover Account"
                width={400}
                icon="Key"
                controls={
                    <div>
                        <Button type="link" onClick={this.props.onCancel}>
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit}>Continue</Button>
                    </div>
                }
            >
                <div style={{ marginTop: '20px' }}>
                    <Validation.components.ValidatedForm
                        ref={(l: any) => (this._form = l)}
                    >
                        <Validation.components.ValidatedFormGroup for="email">
                            <Label>E-Mail</Label>
                            <Validation.components.ValidatedControl
                                type="text"
                                name="email"
                                validators={[
                                    Validation.validators.email,
                                    Validation.validators.required
                                ]}
                                noValidate
                            />
                            <Validation.components.ValidationMessage for="email" />
                        </Validation.components.ValidatedFormGroup>

                        <Validation.components.ValidatedFormGroup for="firstName">
                            <Label>First name</Label>
                            <Validation.components.ValidatedControl
                                type="text"
                                name="firstName"
                                validators={[
                                    Validation.validators.minlength(2),
                                    Validation.validators.required
                                ]}
                                noValidate
                            />
                            <Validation.components.ValidationMessage for="firstName" />
                        </Validation.components.ValidatedFormGroup>

                        <Validation.components.ValidatedFormGroup for="lastName">
                            <Label>Last name</Label>
                            <Validation.components.ValidatedControl
                                type="text"
                                name="lastName"
                                validators={[
                                    Validation.validators.minlength(2),
                                    Validation.validators.required
                                ]}
                                noValidate
                            />
                            <Validation.components.ValidationMessage for="lastName" />
                        </Validation.components.ValidatedFormGroup>
                    </Validation.components.ValidatedForm>
                </div>
            </ModalWindow>
        );
    }
}
export default AccountProcessModal;
