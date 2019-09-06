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
            <Header tools={<HeaderNetwork status={props.networkStatus} />}>
                <HeaderSeparator />
                <FormattedMessage id="auth" defaultMessage="Authorization" />
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
    }

    > .window__body {
        grid-area: body;
    }

    > .window__footer {
        grid-area: footer;
    }

    @media (${media.md}) {
        grid-template-rows: max-content auto max-content;
    }
`;
