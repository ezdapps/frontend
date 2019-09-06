/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { sendAttachment } from 'lib/fs';
import CopyToClipboard from 'react-copy-to-clipboard';
import QRCode from 'qrcode.react';

import Modal from './';
import ModalWindow from 'containers/Modal/ModalWindow';
import Button from 'components/Button/Button';

interface Props {
    privateKey: string;
    publicKey: string;
    address: string;
    onCopy: () => void;
}

class BackupModal extends Modal<Props, void> {
    public static className = ' ';

    onKeyDownload = () => {
        sendAttachment(
            `${this.props.params.address || 'account'}.txt`,
            this.props.params.privateKey
        );
    }

    render() {
        return (
            <ModalWindow
                title={
                    <FormattedMessage
                        id="general.wallet.backup"
                        defaultMessage="Backup account"
                    />
                }
                controls={(
                    <Button onClick={this.props.onCancel}>
                        <FormattedMessage id="close" defaultMessage="Close" />
                    </Button>
                )}
            >
                <table
                    className="table table-striped table-bordered table-hover preline"
                    style={{ wordBreak: 'break-all' }}
                >
                    <tbody>
                        <tr>
                            <td style={{ minWidth: 100 }}>
                                <FormattedMessage
                                    id="general.key.private"
                                    defaultMessage="Private key"
                                />
                            </td>
                            <td>
                                <span>{this.props.params.privateKey}</span>
                                <CopyToClipboard
                                    text={this.props.params.privateKey}
                                    onCopy={this.props.params.onCopy}
                                >
                                    <Button type="link" className="p0 ml">
                                        <FormattedMessage
                                            id="general.clipboard.copy"
                                            defaultMessage="Copy to clipboard"
                                        />
                                    </Button>
                                </CopyToClipboard>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ minWidth: 100 }}>
                                <FormattedMessage
                                    id="general.key.public"
                                    defaultMessage="Public key"
                                />
                            </td>
                            <td>{this.props.params.publicKey}</td>
                        </tr>
                        <tr>
                            <td>
                                <FormattedMessage
                                    id="general.address"
                                    defaultMessage="Address"
                                />
                            </td>
                            <td>{this.props.params.address}</td>
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
                                    <QRCode
                                        value={this.props.params.privateKey}
                                    />
                                    <div className="text-muted">
                                        <FormattedMessage
                                            id="auth.qrcode.desc"
                                            defaultMessage="Use this code to import the account on your mobile device"
                                        />
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="text-center">
                    <Button type="link" onClick={this.onKeyDownload}>
                        <FormattedMessage
                            id="general.download.asfile"
                            defaultMessage="Download as file"
                        />
                    </Button>
                </div>
            </ModalWindow>
        );
    }
}
export default BackupModal;
