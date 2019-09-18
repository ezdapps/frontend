/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import { IWallet } from 'apla/auth';

import Modal from '../';
import ModalWindow from 'containers/Modal/ModalWindow';
import Button from 'components/Button/Button';
import Card from 'components/Card';
import { IAccount } from 'apla/api';

interface Params {
    name: string;
    wallet: IWallet | IAccount;
}

class AuthAccountRemove extends Modal<Params, void> {
    public static className = ' ';

    render() {
        return (
            <ModalWindow
                title="Confirmation"
                width={400}
                controls={
                    <div>
                        <Button type="link" onClick={this.props.onCancel}>
                            Cancel
                        </Button>
                        <Button onClick={() => this.props.onResult(null)}>
                            Confirm
                        </Button>
                    </div>
                }
            >
                <div>Do you realy want to delete this account?</div>
                <div>
                    This action is *IRREVERSIBLE* unless you have a backup of
                    your private key
                </div>
                <div style={{ marginTop: '20px' }}>
                    <Card
                        name={this.props.params.name}
                        account={
                            'address' in this.props.params.wallet
                                ? this.props.params.wallet.address
                                : '0000-0000-0000-0000-0000'
                        }
                    />
                </div>
            </ModalWindow>
        );
    }
}
export default AuthAccountRemove;
