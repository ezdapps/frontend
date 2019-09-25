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
import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { IWallet } from 'apla/auth';

import Modal from '../';

export interface IAuthRemoveWalletModalProps {
    wallet: IWallet;
}

class AuthRemoveWalletModal extends Modal<IAuthRemoveWalletModalProps, void> {
    render() {
        return (
            <div>
                <Modal.Header>
                    <FormattedMessage id="modal.confirm.title" defaultMessage="Confirmation" />
                </Modal.Header>
                <Modal.Body>
                    <FormattedMessage id="auth.remove.desc" defaultMessage="Do you really want to delete this account? THIS ACTION IS IRREVERSIBLE" />
                </Modal.Body>
                <Modal.Footer className="text-right">
                    <Button type="button" bsStyle="link" onClick={this.props.onCancel.bind(this)}>
                        <FormattedMessage id="close" defaultMessage="Close" />
                    </Button>
                    <Button bsStyle="primary" onClick={this.props.onResult.bind(null, true)}>
                        <FormattedMessage id="process.confirm" defaultMessage="Confirm" />
                    </Button>
                </Modal.Footer>
            </div>
        );
    }
}
export default AuthRemoveWalletModal;