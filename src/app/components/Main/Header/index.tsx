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
import { FormattedMessage } from 'react-intl';

import themed from 'components/Theme/themed';
import HeaderIndicator from './HeaderIndicator';
import NotificationsMenu from 'containers/Main/Header/NotificationsMenu';
import UserMenu from 'containers/Main/Header/UserMenu';
import imgLogo from 'images/logoHeader.svg';
import Selector from 'containers/Main/Navigator/Sections/Selector';
import HeaderSpacer from './HeaderSpacer';
import HeaderLink from './HeaderLink';
import LangMenu from 'containers/Main/Header/LangMenu';

interface Props {
    app?: string;
    page?: string;
    isAuthorized: boolean;
}

const StyledHeader = themed.header`
    background: url(${imgLogo}) 20px center ${props => props.theme.menubarBackground} no-repeat;
    height: ${props => props.theme.menubarSize}px;
    color: ${props => props.theme.menubarForeground};
    transition: width .32s ease-in-out;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 8000;
    display: flex;
    flex-direction: row;
    padding-left: 80px;

    .header__filler {
        flex: 1;
    }
`;

const Header: React.SFC<Props> = props => (
    <StyledHeader>
        <HeaderSpacer />
        <Selector section={props.app === 'browse' ? props.page : null} />
        <HeaderSpacer />
        <HeaderLink to="/editor" active={'editor' === props.app}>
            <FormattedMessage id="editor" defaultMessage="Editor" />
        </HeaderLink>
        <div className="header__filler" />

        {props.isAuthorized && (
            <HeaderIndicator
                right
                icon="icon-key"
                title={<FormattedMessage id="privileged" defaultMessage="Privileged mode" />}
                titleDesc={<FormattedMessage id="privileged.desc" defaultMessage="You will not be prompted to enter your password when executing transactions" />}
            />
        )}
        <LangMenu />
        <NotificationsMenu />
        {/*<TransactionsMenu />*/}
        <UserMenu />
    </StyledHeader>
);

export default Header;