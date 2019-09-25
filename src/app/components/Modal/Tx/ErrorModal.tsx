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
import { TTxError } from 'apla/tx';

import Modal from '../';

export interface ITxErrorModalProps {
    type: TTxError;
    error?: string;
    params?: string[];
}

class TxErrorModal extends Modal<ITxErrorModalProps, void> {
    render() {
        const normalizedParams: { [key: string]: string } = {};
        if (this.props.params.params) {
            this.props.params.params.forEach((p, i) => {
                normalizedParams[i] = p;
            });
        }

        return (
            <div>
                <Modal.Header>
                    <FormattedMessage id={`tx.error.${this.props.params.type}`} defaultMessage={this.props.params.type} />
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <FormattedMessage
                            id={`tx.error.${this.props.params.type}.desc`}
                            defaultMessage={this.props.params.type}
                            values={{
                                error: this.props.params.error,
                                ...normalizedParams
                            }}
                        />
                    </div>
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
export default TxErrorModal;