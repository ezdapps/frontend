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
