/*---------------------------------------------------------------------------------------------
*  Copyright (c) EGAAS S.A. All rights reserved.
*  See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Route, Link } from 'react-router-dom';

import themed from 'components/Theme/themed';
import HeaderIndicator from './HeaderIndicator';
import NotificationsMenu from 'containers/Main/Header/NotificationsMenu';
import UserMenu from 'containers/Main/Header/UserMenu';
import imgLogo from 'images/logoHeader.svg';
import Selector from 'containers/Main/Navigator/Sections/Selector';
import HeaderSpacer from './HeaderSpacer';

interface Props {
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
        <div>
            <Route
                path="/:app?/:section?/:page?"
                render={route => <Selector section={route.match.params.section} />}
            />
        </div>
        <HeaderSpacer />
        <Link to="/editor">DND_Editor</Link>
        <div className="header__filler" />

        {props.isAuthorized && (
            <HeaderIndicator
                right
                icon="icon-key"
                title={<FormattedMessage id="privileged" defaultMessage="Privileged mode" />}
                titleDesc={<FormattedMessage id="privileged.desc" defaultMessage="You will not be prompted to enter your password when executing transactions" />}
            />
        )}
        <NotificationsMenu />
        {/*<TransactionsMenu />*/}
        <UserMenu />
    </StyledHeader>
);

export default Header;