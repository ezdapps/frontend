/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as React from 'react';
import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import Modal from '../';
import ModalWindow from 'containers/Modal/ModalWindow';

export interface IAuthErrorModalProps {
    error: string;
    message: string;
}

class AuthErrorModal extends Modal<IAuthErrorModalProps, void> {
    public static className = ' ';

    render() {
        return (
            <ModalWindow
                title={
                    <FormattedMessage id="alert.error" defaultMessage="Error" />
                }
                width={300}
                controls={
                    <Button
                        type="button"
                        bsStyle="primary"
                        onClick={this.props.onCancel}
                    >
                        <FormattedMessage id="close" defaultMessage="Close" />
                    </Button>
                }
            >
                <p>
                    <FormattedMessage
                        id={`auth.error.${this.props.params.error}`}
                        defaultMessage={this.props.params.message}
                    />
                </p>
            </ModalWindow>
        );
    }
}
export default AuthErrorModal;
