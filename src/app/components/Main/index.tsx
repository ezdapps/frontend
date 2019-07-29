/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ISection } from 'apla/content';

import themed from 'components/Theme/themed';
import UserMenu from 'containers/Widgets/UserMenu';
import NotificationsMenu from 'containers/Widgets/NotificationsMenu';
import ToolIndicator from 'components/Main/Toolbar/ToolIndicator';
import Selector from 'containers/Main/Sections/Selector';

const StyledWrapper = themed.div`
    background-color: #f6f8fa;
    position: relative;
`;

export interface IMainProps {
    isAuthorized: boolean;
    // pending: boolean;
    section: string;
    page: string;
    sections: { [name: string]: ISection };
    stylesheet: string;
    // navigationVisible: boolean;
    transactionsCount: number;
    // onNavigationToggle: () => void;
}

const StyledMenu = themed.ul`
    background: ${props => props.theme.headerBackground};
    list-style-type: none;
    padding: 0;
    margin: 0;
    height: ${props => props.theme.menuHeight}px;
    position: relative;

    > li {
        height: 100%;
        line-height: 34px;
        display: inline-block;
        font-size: 16px;
        color: #fff;
        -webkit-app-region: no-drag;
        user-select: none;

        &.user-menu {
            margin-top: 0;
            height: ${props => props.theme.menuHeight}px;
            line-height: normal;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
        }
    }
`;

const StyledContent = themed.section`
    margin-left: 0 !important;
    && { background: ${props => props.theme.contentBackground}; }
    color: ${props => props.theme.contentForeground};
    margin-top: ${props => props.theme.headerHeight + props.theme.menuHeight}px !important;
    transition: none !important;
`;

const Main: React.SFC<IMainProps> = props => (
    <StyledWrapper className="wrapper component-main">
        <style type="text/css">
            {props.stylesheet}
        </style>
        <header>
            <StyledMenu>
                {/* <li>
                        <SectionButton onClick={this.props.onNavigationToggle}>
                                <em className="icon-menu" />
                            </SectionButton>
                    </li> */}
                <li>
                    <Selector section={props.section} />
                </li>
                <ToolIndicator
                    right
                    icon="icon-key"
                    title={<FormattedMessage id="privileged" defaultMessage="Privileged mode" />}
                    titleDesc={<FormattedMessage id="privileged.desc" defaultMessage="You will not be prompted to enter your password when executing transactions" />}
                />
                <li className="user-menu">
                    <NotificationsMenu />
                    {/*<TransactionsMenu />*/}
                    <UserMenu />
                </li>
            </StyledMenu>
        </header>
        <StyledContent>
            {props.children}
        </StyledContent>
    </StyledWrapper >
);

export default Main;