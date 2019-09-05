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
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA

import React from 'react';

import Header from 'components/Header';
import NotificationsMenu from 'containers/Main/Header/NotificationsMenu';
import UserMenu from 'containers/Main/Header/UserMenu';
import HeaderFiller from 'components/Header/HeaderFiller';
// import Selector from 'containers/Main/Navigator/Sections/Selector';
// import HeaderSeparator from 'components/Header/HeaderSeparator';
// import HeaderLink from './HeaderLink';
// import LangMenu from 'containers/Main/Header/LangMenu';
// import HeaderIndicator from './HeaderIndicator';

interface Props {
    app?: string;
    page?: string;
    isAuthorized: boolean;
}

const MainHeader: React.SFC<Props> = props => (
    <Header>
        {/* <HeaderSeparator />
        <Selector section={props.app === 'browse' ? props.page : null} />
        <HeaderSeparator /> */}
        {/* <HeaderLink to="/editor" active={'editor' === props.app}>
            <FormattedMessage id="editor" defaultMessage="Editor" />
        </HeaderLink> */}
        <HeaderFiller />

        {/* {props.isAuthorized && (
            <HeaderIndicator
                right
                icon="icon-key"
                title={
                    <FormattedMessage
                        id="privileged"
                        defaultMessage="Privileged mode"
                    />
                }
                titleDesc={
                    <FormattedMessage
                        id="privileged.desc"
                        defaultMessage="You will not be prompted to enter your password when executing transactions"
                    />
                }
            />
        )}
        <LangMenu /> */}
        <NotificationsMenu />
        {/*<TransactionsMenu />*/}
        <UserMenu />
    </Header>
);

export default MainHeader;
