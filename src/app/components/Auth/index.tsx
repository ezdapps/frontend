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
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import imgLogo from 'images/logo.svg';

import themed from 'components/Theme/themed';
import Wallet from 'components/Auth/Wallet';
import Login from 'containers/Auth/Login';
import NetworkList from 'containers/Auth/Login/NetworkList';
import AddNetwork from 'containers/Auth/Login/NetworkList/AddNetwork';
import { Button } from 'react-bootstrap';

export interface IAuthProps {
    className?: string;
    locale: string;
    changeLocale: () => void;
}

const Auth: React.SFC<IAuthProps & InjectedIntlProps> = props => (
    <div className={props.className}>
        <div className="auth-window-container">
            <div className="auth-window">
                <div className="panel panel-default m0">
                    <div className="panel-body">
                        <Switch>
                            <Route path="/account" component={Wallet} />
                            <Route path="/networks/add" component={AddNetwork} />
                            <Route path="/networks" component={NetworkList} />
                            <Route path="/" component={Login} />
                            <Redirect to="/" />
                        </Switch>
                    </div>
                </div>
                <div className="clearfix p-lg text-center text-white">
                    <div className="pull-left">
                        <div>
                            <FormattedMessage id="legal.copy" defaultMessage="Apla © 2017-2019 - " />
                            <a
                                href={props.intl.formatMessage({
                                    id: 'legal.homepage',
                                    defaultMessage: 'https://apla.io'
                                })}
                            >
                                <FormattedMessage id="legal.homepage" defaultMessage="https://apla.io" />
                            </a>
                        </div>
                    </div>
                    <div className="pull-right">
                        <Button bsStyle="link" className="p0 m0" onClick={props.changeLocale}>
                            <FormattedMessage id="LANG_NAME" defaultMessage={props.locale} />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default themed(injectIntl(Auth))`
    display: table; 
    width: 100%;
    height: 100%;
    max-height: 100%;
    overflow: hidden;

    .auth-window-container {
        display: table-cell;
        vertical-align: middle;
        overflow: hidden;
        height: 100%;

        .auth-window {
            text-align: center;
            max-width: 600px;
            height: auto;
            padding: 10px;
            padding-top: 0;
            margin: 0 auto;
            
            .panel {
                height: auto;
                overflow: hidden;
                background: #fff;
                border: 0;

                > .panel-heading {
                    position: relative;
                    background: url(${imgLogo}) no-repeat 50% 50% ${props => props.theme.headerBackground};
                    background-size: 65px;
                    height: 28px;
                    padding: 0;
                    user-select: none;
                    -webkit-app-region: drag;

                    .auth-back {
                        -webkit-app-region: no-drag;
                        position: absolute;
                        right: auto;
                        left: 30px;
                        top: 0;
                        line-height: 28px;

                        .icon {
                            position: relative;
                            vertical-align: middle;
                            font-size: 16px;
                            top: -2px;
                            margin-right: 5px;
                        }

                        &.auth-back-darwin {
                            left: auto;
                            right: 30px;
                        }
                    }
                }

                > .panel-body {
                    overflow-x: hidden;
                    overflow-y: auto;
                    max-height: 100%;
                    height: 100%;
                }
            }
        }
    }
`;