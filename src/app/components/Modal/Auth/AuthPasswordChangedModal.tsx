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
import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import Modal from '../';

class AuthPasswordChangedModal extends Modal<{}, void> {
    render() {
        return (
            <div>
                <Modal.Header>
                    <FormattedMessage id="alert.info" defaultMessage="Information" />
                </Modal.Header>
                <Modal.Body>
                    <div><FormattedMessage id="auth.password.changed" defaultMessage="Password changed. Please login with new password" /></div>
                </Modal.Body>
                <Modal.Footer className="text-right">
                    <Button type="button" bsStyle="primary" onClick={this.props.onCancel.bind(this)}>
                        <FormattedMessage id="close" defaultMessage="Close" />
                    </Button>
                </Modal.Footer>
            </div>
        );
    }
}
export default AuthPasswordChangedModal;