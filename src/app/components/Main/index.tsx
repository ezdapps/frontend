/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { INetworkEndpoint } from 'apla/auth';
import { ISection } from 'apla/content';
import { history } from 'store';
import platform from 'lib/platform';

import themed from 'components/Theme/themed';
import Titlebar from './Titlebar';
import UserMenu from 'containers/Widgets/UserMenu';
import NotificationsMenu from 'containers/Widgets/NotificationsMenu';
import Toolbar from './Toolbar';
import ToolButton from 'components/Main/Toolbar/ToolButton';
import EditorToolbar from 'containers/Main/Toolbar/EditorToolbar';
import ToolIndicator from 'components/Main/Toolbar/ToolIndicator';
import LoadingBar from './LoadingBar';
import Selector from 'containers/Main/Sections/Selector';

const StyledWrapper = themed.div`
    background-color: #f6f8fa;
`;

export interface IMainProps {
    network: INetworkEndpoint;
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

const StyledControls = themed.div`
    position: fixed;
    top: ${platform.select({ win32: '1px' }) || 0};
    left: ${platform.select({ win32: '1px' }) || 0};
    right: ${platform.select({ win32: '1px' }) || 0};
    z-index: 10000;
`;

const StyledTitlebar = themed.div`
    background: ${props => props.theme.headerBackground};
    height: ${props => props.theme.headerHeight}px;
    line-height: ${props => props.theme.headerHeight}px;
    font-size: 15px;
    color: #fff;
    text-align: center;
`;

const StyledMenu = themed.ul`
    background: ${props => props.theme.headerBackground};
    list-style-type: none;
    padding: 0;
    margin: 0;
    height: ${props => props.theme.menuHeight}px;
    position: relative;

    > li {
        margin-top: 6px;
        height: 34px;
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
    margin-top: ${props => props.theme.headerHeight + props.theme.menuHeight + props.theme.toolbarHeight}px !important;
    transition: none !important;
`;

class Main extends React.Component<IMainProps> {
    onBack() {
        history.goBack();
    }

    onForward() {
        history.goForward();
    }

    render() {
        const appTitle = `Apla ${this.props.network ? '(' + this.props.network.apiHost + ')' : ''}`;

        return (
            <StyledWrapper className="wrapper component-main">
                <style type="text/css">
                    {this.props.stylesheet}
                </style>
                <StyledControls>
                    <StyledTitlebar className="drag">
                        <Titlebar>{appTitle}</Titlebar>
                    </StyledTitlebar>
                    <StyledMenu className="drag">
                        <li>
                            {/* <SectionButton onClick={this.props.onNavigationToggle}>
                                <em className="icon-menu" />
                            </SectionButton> */}
                        </li>
                        <Selector section={this.props.section} />
                        <li className="user-menu">
                            <NotificationsMenu />
                            {/*<TransactionsMenu />*/}
                            <UserMenu />
                        </li>
                    </StyledMenu>
                    <Toolbar>
                        {this.props.isAuthorized && (
                            <ToolIndicator
                                right
                                icon="icon-key"
                                title={<FormattedMessage id="privileged" defaultMessage="Privileged mode" />}
                                titleDesc={<FormattedMessage id="privileged.desc" defaultMessage="You will not be prompted to enter your password when executing transactions" />}
                            />
                        )}
                        {'editor' === this.props.section ?
                            (
                                <EditorToolbar />
                            ) : (
                                <div>
                                    <ToolButton icon="icon-arrow-left" onClick={this.onBack}>
                                        <FormattedMessage id="navigation.back" defaultMessage="Back" />
                                    </ToolButton>
                                    <ToolButton icon="icon-arrow-right" onClick={this.onForward}>
                                        <FormattedMessage id="navigation.forward" defaultMessage="Forward" />
                                    </ToolButton>
                                    {/* <ToolButton icon="icon-home" onClick={this.props.onNavigateHome}>
                                        <FormattedMessage id="navigation.home" defaultMessage="Home" />
                                    </ToolButton>
                                    <ToolButton icon="icon-refresh" onClick={this.props.onRefresh}>
                                        <FormattedMessage id="navigation.refresh" defaultMessage="Refresh" />
                                    </ToolButton> */}
                                </div>
                            )
                        }
                    </Toolbar>
                    <LoadingBar />
                </StyledControls >
                <StyledContent>
                    {this.props.children}
                </StyledContent>
            </StyledWrapper >
        );
    }
}

export default Main;