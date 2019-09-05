/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *---------------------------------------------------------------------------------------------*/

import React from 'react';
import themed from 'components/Theme/themed';
import AccountButton from 'components/Button/AccountButton';
import { IWallet } from 'apla/auth';
import { IAccount } from 'apla/api';
import { INotificationsMessage } from 'apla/socket';
import Welcome from 'components/Auth/Welcome';

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
    <div className={props.className}>
        {props.items.length ? (
            <ul className="accountList__items">
                {props.items.map((account, index) => {
                    const name = `TEST_ACCOUNT_#${index + 1}`;
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
                                onClick={() => props.onSelect(account)}
                                onShare={() => props.onShare(account)}
                                onRemove={() =>
                                    props.onRemove({ wallet: account, name })
                                }
                            />
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
    height: 100%;

    .accountList__items {
        list-style-type: none;
        padding: 10px;
        margin: 0;

        > li {
            text-align: center;
            margin-bottom: 5px;
    
            &:last-child {
                margin-bottom: 0;
            }
        }  
    }
`;
