/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

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
