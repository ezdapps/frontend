/*---------------------------------------------------------------------------------------------
*  Copyright (c) EGAAS S.A. All rights reserved.
*  See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

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