/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';

import Modal from '../';
import ModalWindow from 'containers/Modal/ModalWindow';
import Button from 'components/Button/Button';
import Card from 'components/Card';

interface Params {
    name: string;
    account: string;
}

class AuthAccountCreated extends Modal<Params, void> {
    public static className = ' ';

    render() {
        return (
            <ModalWindow
                title="Congratulations!"
                width={400}
                controls={
                    <div>
                        <Button onClick={() => this.props.onResult(null)}>
                            Finish
                        </Button>
                    </div>
                }
            >
                <div>Your account has been successfully created</div>
                <div style={{ marginTop: '20px' }}>
                    <Card
                        name={this.props.params.name}
                        account={this.props.params.account}
                    />
                </div>
            </ModalWindow>
        );
    }
}
export default AuthAccountCreated;
