/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';

import Modal from '../';
import ModalWindow from 'containers/Modal/ModalWindow';
import Button from 'components/Button/Button';

interface Params {
    password: string;
}

class SecurityNoticeModal extends Modal<Params, void> {
    public static className = ' ';

    render() {
        return (
            <ModalWindow
                title="Create new account"
                width={400}
                icon="Key"
                controls={
                    <div>
                        <Button type="link" onClick={this.props.onCancel}>
                            Cancel
                        </Button>
                        <Button onClick={() => this.props.onResult(null)}>
                            Continue
                        </Button>
                    </div>
                }
            >
                <div>
                    In order to make your e-signature in the system legally
                    binding, please confirm the generated public/private keys by
                    signing with your existing LuxTrust token. Please note that
                    the LuxTrust e-signing certificate, including your
                    credentials (i.e., full name and contact details), will be
                    sent to the users' onboarding authority for account
                    validation purposes
                </div>
            </ModalWindow>
        );
    }
}
export default SecurityNoticeModal;
