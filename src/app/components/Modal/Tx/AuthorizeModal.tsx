/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import { FormattedMessage } from 'react-intl';

import Modal from '../';
import Validation from 'components/Validation';
import ModalWindow from 'containers/Modal/ModalWindow';
import Button from 'components/Button/Button';
import ValidatedForm from 'components/Validation/ValidatedForm';

class AuthorizeModal extends Modal<void, string> {
    public static className = ' ';

    private _form: ValidatedForm;

    handleSubmit = () => {
        const form = this._form.validateAll();
        if (form.valid) {
            this.props.onResult(form.payload.password.value);
        }
    }

    render() {
        return (
            <ModalWindow
                title={
                    <FormattedMessage
                        id="modal.authorization.title"
                        defaultMessage="Authorization"
                    />
                }
                controls={
                    <>
                        <Button type="link" onClick={this.props.onCancel}>
                            <FormattedMessage
                                id="cancel"
                                defaultMessage="Cancel"
                            />
                        </Button>
                        <Button onClick={this.handleSubmit}>
                            <FormattedMessage
                                id="confirm"
                                defaultMessage="Confirm"
                            />
                        </Button>
                    </>
                }
            >
                <Validation.components.ValidatedForm
                    ref={(l: any) => (this._form = l)}
                >
                    <div className="pb">
                        <FormattedMessage
                            id="modal.authorization.password"
                            defaultMessage="Please enter your password to perform this action"
                        />
                    </div>
                    <Validation.components.ValidatedFormGroup for="password">
                        <Validation.components.ValidatedControl
                            type="password"
                            name="password"
                            noValidate
                            validators={[
                                Validation.validators.password,
                                Validation.validators.required
                            ]}
                        />
                        <Validation.components.ValidationMessage for="password" />
                    </Validation.components.ValidatedFormGroup>
                </Validation.components.ValidatedForm>
            </ModalWindow>
        );
    }
}
export default AuthorizeModal;
