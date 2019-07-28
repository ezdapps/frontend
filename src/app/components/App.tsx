/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import { Route } from 'react-router-dom';
import { FormattedMessage, IntlProvider } from 'react-intl';
import platform from 'lib/platform';
import classnames from 'classnames';
import baseTheme from 'components/Theme/baseTheme';

import { AnimatedSwitch } from 'components/Animation';
import themed from 'components/Theme/themed';
import Main from 'containers/Main';
import Auth from 'containers/Auth';
import Error from 'containers/Auth/Error';
import Splash from 'components/Splash';
import ModalProvider from 'containers/Modal/ModalProvider';
import NotificationsProvider from 'containers/Notifications/NotificationsProvider';
import SecurityWarning from 'containers/SecurityWarning';
import ThemeProvider from 'components/Theme/ThemeProvider';

interface AppProps {
    locale: string;
    isSessionAcquired: boolean;
    isAuthenticated: boolean;
    isLoaded: boolean;
    isFatal: boolean;
    securityWarningClosed: boolean;
    localeMessages: { [key: string]: string };
    initialize?: () => void;
}

const ThemedApp = themed.div`
    &.platform-windows {
        border: solid 1px ${props => props.theme.windowBorder};
    }
`;

class App extends React.Component<AppProps> {
    componentDidMount() {
        this.props.initialize();
    }

    render() {
        const classes = classnames({
            'wrapper': true,
            'layout-fixed': true,
            'platform-desktop': platform.select({ desktop: true }),
            'platform-web': platform.select({ web: true }),
            'platform-windows': platform.select({ win32: true })
        });

        return (
            <IntlProvider locale={this.props.locale} defaultLocale="en-US" messages={this.props.localeMessages}>
                <ThemeProvider theme={baseTheme}>
                    <ThemedApp className={classes}>
                        <ModalProvider />
                        <NotificationsProvider />
                        {platform.select({
                            web: !this.props.securityWarningClosed && (
                                <SecurityWarning>
                                    <FormattedMessage id="general.security.warning" defaultMessage="Please use desktop version or mobile application for better security" />
                                </SecurityWarning>
                            )
                        })}

                        <AnimatedSwitch animation={AnimatedSwitch.animations.fade()}>
                            {this.props.isFatal && (
                                <Route path="/" component={Error} />
                            )}
                            {!this.props.isLoaded && (
                                <Route path="/" component={Splash} />
                            )}
                            {!this.props.isAuthenticated && (
                                <Route path="/" component={Auth} />
                            )}
                            {!this.props.isSessionAcquired && (
                                <Route path="/" component={Splash} />
                            )}
                            <Route path="/:section?/:page?" render={route => <Main section={route.match.params.section} page={route.match.params.page} />} />
                        </AnimatedSwitch>
                    </ThemedApp>
                </ThemeProvider>
            </IntlProvider>
        );
    }
}

export default App;