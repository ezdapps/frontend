/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ISection } from 'apla/content';

import themed from 'components/Theme/themed';
import UserMenu from 'containers/Navigator/UserMenu';
import NotificationsMenu from 'containers/Navigator/NotificationsMenu';
import ToolIndicator from 'components/Toolbar/ToolIndicator';
import Selector from 'containers/Navigator/Sections/Selector';
import Sections from 'containers/Navigator/Sections';

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

const StyledHeader = themed.header`
    background: ${props => props.theme.headerBackground};
    height: ${props => props.theme.menuHeight}px;

    > ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
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
    }
`;

const StyledContent = themed.section`
    margin-left: 0 !important;
    && { background: ${props => props.theme.contentBackground}; }
    color: ${props => props.theme.contentForeground};
    transition: none !important;
`;

const Navigator: React.SFC<IMainProps> = props => (
    <StyledWrapper className="wrapper">
        <style type="text/css">
            {props.stylesheet}
        </style>
        <StyledHeader>
            <ul>
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
            </ul>
        </StyledHeader>
        <StyledContent>
            <Sections section={props.section} page={props.page} />
        </StyledContent>
    </StyledWrapper>
);

export default Navigator;