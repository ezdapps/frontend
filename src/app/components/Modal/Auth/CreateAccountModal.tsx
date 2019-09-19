/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React, { ChangeEventHandler } from 'react';

import { ModalContainer, IModalProps } from '../';
import ModalWindow from 'containers/Modal/ModalWindow';
import Button from 'components/Button/Button';
import Validation from 'components/Validation';
import Label from 'components/Form/Label';
import ValidatedForm from 'components/Validation/ValidatedForm';

interface Params {}

interface State {
    password: string;
}

class CreateAccountModal extends ModalContainer<
    IModalProps<Params, string>,
    State
> {
    public static className = ' ';

    state: State = {
        password: ''
    };

    private _form: ValidatedForm;

    handleSubmit = () => {
        const values = this._form.validateAll();

        if (values.valid) {
            this.props.onResult(this.state.password);
        }
    }

    handleChange: ChangeEventHandler<any> = e => {
        this.setState({
            password: e.target.value
        });
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
                <div>
                    Your keys have been generated. Please create a new password
                </div>
                <div style={{ marginTop: '20px' }}>
                    <Validation.components.ValidatedForm
                        ref={(l: any) => (this._form = l)}
                    >
                        <Validation.components.ValidatedFormGroup for="password">
                            <Label>New password</Label>
                            <Validation.components.ValidatedControl
                                type="password"
                                name="password"
                                validators={[Validation.validators.password]}
                                onChange={this.handleChange}
                                value={this.state.password}
                                noValidate
                            />
                            <Validation.components.ValidationMessage for="password" />
                        </Validation.components.ValidatedFormGroup>
                        <Validation.components.ValidatedFormGroup for="confirmation">
                            <Label>Repeat password</Label>
                            <Validation.components.ValidatedControl
                                key={this.state.password}
                                type="password"
                                name="confirmation"
                                validators={[
                                    Validation.validators.compare(
                                        this.state.password
                                    )
                                ]}
                                noValidate
                            />
                            <Validation.components.ValidationMessage for="confirmation" />
                        </Validation.components.ValidatedFormGroup>
                    </Validation.components.ValidatedForm>
                </div>
            </ModalWindow>
        );
    }
}
export default CreateAccountModal;
