/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { IAccountContext } from 'apla/auth';
import { IEcosystemInfo } from 'apla/api';

import { CloseDropdownButton } from 'components/DropdownButton';
import PageLink from 'components/Routing/PageLink';
import HeaderButton from './HeaderButton';
import Avatar from 'containers/Avatar';
import themed from 'components/Theme/themed';

const StyledUserMenu = themed.div`
    -webkit-app-region: no-drag;
    line-height: 0;
    display: inline-block;
    vertical-align: top;
    height: 40px;   
    padding: 0 0 0 10px !important;
    line-height: 18px;
    color: #fff;

    > .user-info {
        text-align: right;
        float: left;
        margin-right: 5px;
        white-space: nowrap;
        max-width: 170px;

        > .user-title {
            margin-top: 4px;
            font-size: 14px;
            font-weight: 600;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        > .user-subtitle {
            text-transform: uppercase;
            font-size: 13px;
            font-weight: 300;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }

    > .user-avatar {
        float: right;
        margin: 4px;
    }

    .user-dropdown {
        background: #fff;
        box-shadow: 0 0 25px rgba(0,0,0,.15);
        border-left: solid 1px #add1ff;
        border-bottom: solid 1px #add1ff;
    }
`;

interface Props {
    mainSection: string;
    isDefaultWallet: boolean;
    wallet?: IAccountContext;
    walletEcosystems: IEcosystemInfo[];
    onSwitchEcosystem: (ecosystem: string, defaultRole?: boolean) => void;
    onLogout: () => void;
    onChangePassword: () => void;
}

const UserMenu: React.SFC<Props> = props => props.wallet && props.wallet.wallet && (
    <HeaderButton
        className="p0"
        width={225}
        align="right"
        rightMost
        content={
            <div>
                <ul className="dropdown-group">
                    {!props.isDefaultWallet && (
                        <>
                            <li>
                                <CloseDropdownButton onClick={props.onChangePassword}>
                                    <em className="icon icon-key text-muted" />
                                    <span>
                                        <FormattedMessage id="general.wallet.changepassword" defaultMessage="Change password" />
                                    </span>
                                </CloseDropdownButton>
                            </li>
                            <li>
                                <PageLink page="backup" section={props.mainSection}>
                                    <CloseDropdownButton>
                                        <em className="icon icon-shield text-muted" />
                                        <span>
                                            <FormattedMessage id="general.wallet.backup" defaultMessage="Backup account" />
                                        </span>
                                    </CloseDropdownButton>
                                </PageLink>
                            </li>
                        </>
                    )}
                    <li>
                        <CloseDropdownButton onClick={props.onLogout}>
                            <em className="icon icon-logout text-danger" />
                            <span>
                                <FormattedMessage id="general.wallet.signout" defaultMessage="Sign out" />
                            </span>
                        </CloseDropdownButton>
                    </li>
                </ul>
                <div className="dropdown-heading">
                    <FormattedMessage id="general.ecosystems" defaultMessage="Ecosystems" />
                </div>
                <ul className="dropdown-group">
                    {props.walletEcosystems.map(value => (
                        <li key={value.ecosystem}>
                            {/*wallet.ecosystem !== this.props.wallet.ecosystem && this.props.switchWallet.bind(this, wallet)*/}
                            <CloseDropdownButton style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} onClick={() => props.onSwitchEcosystem(value.ecosystem, !value.roles.length)}>
                                {value.name ?
                                    (
                                        value.name
                                    ) :
                                    (
                                        <FormattedMessage id="general.wallet.ecosystemNo" defaultMessage="Ecosystem #{ecosystem}" values={{ ecosystem: value.ecosystem }} />
                                    )
                                }
                            </CloseDropdownButton>
                        </li>
                    ))}
                </ul>
            </div>
        }
    >
        <StyledUserMenu>
            <div className="user-info">
                <div className="user-title">
                    {props.isDefaultWallet ?
                        (
                            <FormattedMessage id="auth.login.guest" defaultMessage="Demo" />
                        ) :
                        (
                            <span>{props.wallet.wallet.address}</span>
                        )
                    }
                </div>
                <div className="user-subtitle">
                    {props.wallet.access.name || (
                        <FormattedMessage id="general.wallet.ecosystemNo" defaultMessage="Ecosystem #{ecosystem}" values={{ ecosystem: props.wallet.access.ecosystem }} />
                    )}
                </div>
            </div>
            <Avatar
                className="user-avatar"
                size={32}
                account={props.wallet.wallet.address}
                ecosystem={props.wallet.access.ecosystem}
            />
        </StyledUserMenu>
    </HeaderButton>
);

export default UserMenu;