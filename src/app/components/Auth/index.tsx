/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import { FormattedMessage } from 'react-intl';

import Window from 'components/Window';
import WindowBody from 'components/Window/WindowBody';
import Header from 'components/Header';
import HeaderNetwork from 'components/Header/HeaderNetwork';
import WindowFooter from 'components/Window/WindowFooter';
import AccountList from 'containers/AccountList';
import Button from 'components/Button/Button';

interface Props {
    className?: string;
    activationEnabled?: boolean;
    onCreate: () => any;
}

const Auth: React.SFC<Props> = props => (
    <Window>
        <Header tools={<HeaderNetwork status="PENDING" />}>
            <FormattedMessage id="auth" defaultMessage="Authorization" />
        </Header>
        <WindowBody>
            <AccountList />
        </WindowBody>
        <WindowFooter>
            <Button
                className="btn btn-primary btn-block"
                onClick={props.onCreate}
            >
                <FormattedMessage
                    id="wallet.create"
                    defaultMessage="Create account"
                />
            </Button>
        </WindowFooter>
    </Window>
);

export default Auth;
