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
import HeaderSeparator from 'components/Header/HeaderSeparator';
import themed from 'components/Theme/themed';
import media from 'components/Theme/media';

interface Props {
    className?: string;
    isEmpty: boolean;
    networkStatus: 'ONLINE' | 'OFFLINE' | 'PENDING';
    activationEnabled: boolean;
    onCreate: () => any;
    onRecover: () => any;
}

const Auth: React.SFC<Props> = props => (
    <Window className={props.className}>
        <div className="window__header">
            <Header
                vertical
                tools={<HeaderNetwork status={props.networkStatus} />}
            >
                <HeaderSeparator />
                <div>Select account to sign in</div>
            </Header>
        </div>
        <WindowBody className="window__body">
            <AccountList />
        </WindowBody>
        <WindowFooter className="window__footer">
            {props.isEmpty ? (
                <Button
                    className="btn btn-primary btn-block"
                    onClick={props.onCreate}
                >
                    <FormattedMessage
                        id="wallet.create"
                        defaultMessage="Create account"
                    />
                </Button>
            ) : (
                <Button
                    className="btn btn-primary btn-block"
                    onClick={props.onRecover}
                >
                    <span>Recover access</span>
                </Button>
            )}
        </WindowFooter>
    </Window>
);

export default themed(Auth)`
    display: grid;
    grid-template-rows: max-content max-content max-content;
    grid-template-columns: 100%;
    grid-template-areas:
        'header'
        'body'
        'footer';
    height: 100%;
    max-width: 100%;
    width: 100%;

    > .window__header {
        grid-area: header;
        z-index: 5;
        box-shadow: rgba(0,0,0,0.4) 0 2px 5px;
    }

    > .window__body {
        grid-area: body;
        z-index: 4;
    }

    > .window__footer {
        grid-area: footer;
        z-index: 3;
    }

    @media (${media.md}) {
        grid-template-rows: max-content auto max-content;
    }
`;
