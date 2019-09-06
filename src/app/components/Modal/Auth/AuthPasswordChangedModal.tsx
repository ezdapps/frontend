/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import { FormattedMessage } from 'react-intl';
import ModalWindow from 'containers/Modal/ModalWindow';

import Modal from '../';
import Button from 'components/Button/Button';

class AuthPasswordChangedModal extends Modal<{}, void> {
    public static className = ' ';
    
    render() {
        return (
            <ModalWindow
                title={
                    <FormattedMessage
                        id="alert.info"
                        defaultMessage="Information"
                    />
                }
                controls={(
                    <Button onClick={this.props.onCancel}>
                        <FormattedMessage id="close" defaultMessage="Close" />
                    </Button>
                )}
            >
                <FormattedMessage
                    id="auth.password.changed"
                    defaultMessage="Password changed. Please login with new password"
                />
            </ModalWindow>
        );
    }
}
export default AuthPasswordChangedModal;
