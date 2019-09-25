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
import themed from 'components/Theme/themed';
import AccountButton from 'components/Button/AccountButton';
import { IWallet } from 'apla/auth';
import { IAccount } from 'apla/api';
import { INotificationsMessage } from 'apla/socket';
import Welcome from 'components/Auth/Welcome';
import classNames from 'classnames';

interface Props {
    className?: string;
    items: IAccount[];
    notifications: INotificationsMessage[];
    children?: never;
    onSelect: (wallet: IWallet) => any;
    onRemove: (params: { wallet: IWallet; name: string }) => any;
    onShare: (wallet: IWallet) => any;
}

const AccountList: React.SFC<Props> = props => (
    <div
        className={classNames(props.className, {
            accountList_empty: 0 === props.items.length
        })}
    >
        {props.items.length ? (
            <ul className="accountList__items">
                {props.items.map((account, index) => {
                    const name = account.address
                        ? `Account #${account.address.slice(-4)}`
                        : 'Unvalidated account';
                    return (
                        <li key={account.address || index}>
                            <AccountButton
                                name={name}
                                account={account.address}
                                badge={
                                    account.address
                                        ? props.notifications.filter(
                                              l => l.id === account.id
                                          ).length
                                        : {
                                              type: 'warning',
                                              value: 'icon-hourglass'
                                          }
                                }
                                last={index === props.items.length - 1}
                                onClick={() => props.onSelect(account)}
                                onShare={() => props.onShare(account)}
                                onRemove={() =>
                                    props.onRemove({ wallet: account, name })
                                }
                            />
                            <hr />
                        </li>
                    );
                })}
            </ul>
        ) : (
            <Welcome />
        )}
    </div>
);

export default themed(AccountList)`
    &.accountList_empty {
        height: 100%;
    }

    .accountList__items {
        list-style-type: none;
        padding: 10px;
        margin: 0;

        > li {
            text-align: center;
            margin-bottom: 5px;
    
            > hr {
                border-bottom: 0;
                border-left: 0;
                border-right: 0;
                border-top: solid 1px #e8e8e8;
                height: 0;
                margin: 5px 25px 5px;
            }

            &:last-child {
                margin-bottom: 0;

                > hr {
                    display: none;
                }
            }
        }  
    }
`;
