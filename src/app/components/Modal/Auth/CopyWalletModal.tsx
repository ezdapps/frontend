/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

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
