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

class SecurityNoticeModal extends Modal<Params, boolean> {
    public static className = ' ';

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
                        <Button onClick={() => this.props.onResult(true)}>
                            Continue
                        </Button>
                    </div>
                }
            >
                <div>
                    In order to make your e-signature in the system legally
                    binding, please confirm the generated public/private keys by
                    signing with your existing LuxTrust token. Your LuxTrust
                    e-signing credentials will be sent to the LHoFT for account
                    validation purposes.
                </div>
                <div className="text-center">
                    <button
                        className="btn btn-link"
                        onClick={() => this.props.onResult(false)}
                    >
                        I don’t have a LuxTrust token
                    </button>
                </div>
            </ModalWindow>
        );
    }
}
export default SecurityNoticeModal;
