/*---------------------------------------------------------------------------------------------
*  Copyright (c) EGAAS S.A. All rights reserved.
*  See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Switch, Route } from 'react-router-dom';

import themed from 'components/Theme/themed';
import ToolIndicator from 'components/Toolbar/ToolIndicator';
import NotificationsMenu from 'containers/Main/Header/NotificationsMenu';
import UserMenu from 'containers/Main/Header/UserMenu';
import imgLogo from 'images/logoHeader.svg';
import Selector from 'containers/Main/Navigator/Sections/Selector';
import HeaderSpacer from './HeaderSpacer';

interface Props {
}

const StyledHeader = themed.header`
    background: url(${imgLogo}) 20px center ${props => props.theme.menubarBackground} no-repeat;
    height: ${props => props.theme.menubarSize}px;
    transition: width .32s ease-in-out;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10000;
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
            <Switch>
                <Route
                    path="/browse/:section?/:page?"
                    render={route => <Selector section={route.match.params.section} />}
                />
            </Switch>
        </div>
        <div className="header__filler" />

        <ToolIndicator
            right
            icon="icon-key"
            title={<FormattedMessage id="privileged" defaultMessage="Privileged mode" />}
            titleDesc={<FormattedMessage id="privileged.desc" defaultMessage="You will not be prompted to enter your password when executing transactions" />}
        />
        <NotificationsMenu />
        {/*<TransactionsMenu />*/}
        <UserMenu />
    </StyledHeader>
);

export default Header;