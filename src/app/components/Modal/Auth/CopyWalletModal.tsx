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
import { FormattedMessage } from 'react-intl';
import { IWallet } from 'apla/auth';
import QRCode from 'qrcode.react';
import CopyToClipboard from 'react-copy-to-clipboard';

import Modal from '../';
import ModalWindow from 'containers/Modal/ModalWindow';
import Button from 'components/Button/Button';

export interface ICopyWalletModalParams {
    wallet: IWallet;
}

class CopyWalletModal extends Modal<ICopyWalletModalParams, void> {
    public static className = ' ';

    formatKey = (key: string) => {
        return key.match(/.{1,2}/g).join(' ');
    }

    getCopyPayload = () => {
        return this.props.params.wallet.publicKey;
    }

    render() {
        return (
            <ModalWindow
                title={
                    <FormattedMessage
                        id="auth.wallet.share.long"
                        defaultMessage="Share account"
                    />
                }
                controls={(
                    <Button type="primary" onClick={this.props.onCancel}>
                        <FormattedMessage id="close" defaultMessage="Close" />
                    </Button>
                )}
            >
                <table
                    className="mt table table-striped table-bordered table-hover preline mb0"
                    style={{ maxWidth: 500 }}
                >
                    <tbody>
                        <tr>
                            <td style={{ minWidth: 100 }}>
                                <FormattedMessage
                                    id="general.key.public"
                                    defaultMessage="Public key"
                                />
                            </td>
                            <td>
                                {this.formatKey(
                                    this.props.params.wallet.publicKey
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <FormattedMessage
                                    id="auth.qrcode"
                                    defaultMessage="QR-Code"
                                />
                            </td>
                            <td>
                                <div className="text-center">
                                    <QRCode value={this.getCopyPayload()} />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="text-center">
                    <CopyToClipboard text={this.getCopyPayload()}>
                        <Button type="link">
                            <FormattedMessage
                                id="general.clipboard.copy"
                                defaultMessage="Copy to clipboard"
                            />
                        </Button>
                    </CopyToClipboard>
                </div>
            </ModalWindow>
        );
    }
}
export default CopyWalletModal;
