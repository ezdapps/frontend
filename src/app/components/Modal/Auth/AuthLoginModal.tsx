/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import { IWallet } from 'apla/auth';

import Modal from '../';
import ModalWindow from 'containers/Modal/ModalWindow';
import Button from 'components/Button/Button';
import Validation from 'components/Validation';
import Label from 'components/Form/Label';
import ValidatedForm from 'components/Validation/ValidatedForm';

interface Params {
    wallet: IWallet;
}

class AuthLoginModal extends Modal<Params, string> {
    public static className = ' ';

    private _form: ValidatedForm;

    handleConfirm = () => {
        const form = this._form.validateAll();

        if (form.valid) {
            this.props.onResult(form.payload.password.value);
        } else {
            this.props.onResult(null);
        }
    }

    render() {
        return (
            <ModalWindow
                title="Login"
                width={400}
                controls={
                    <div>
                        <Button type="link" onClick={this.props.onCancel}>
                            Cancel
                        </Button>
                        <Button onClick={this.handleConfirm}>Confirm</Button>
                    </div>
                }
            >
                <div>Please enter your password to sign in</div>
                <div style={{ marginTop: '20px' }}>
                    <Validation.components.ValidatedForm
                        ref={(l: any) => (this._form = l)}
                    >
                        <Validation.components.ValidatedFormGroup for="password">
                            <Label>Password</Label>
                            <Validation.components.ValidatedControl
                                type="password"
                                name="password"
                                validators={[Validation.validators.password]}
                                noValidate
                            />
                            <Validation.components.ValidationMessage for="password" />
                        </Validation.components.ValidatedFormGroup>
                    </Validation.components.ValidatedForm>
                </div>
            </ModalWindow>
        );
    }
}
export default AuthLoginModal;
