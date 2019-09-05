/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *---------------------------------------------------------------------------------------------*/

import React from 'react';
import { MoreVertical } from 'react-feather';
import themed from 'components/Theme/themed';
import DropdownButton from './DropdownButton';
import Item from 'components/Dropdown/Item';

interface Props {
    className?: string;
    name: string;
    account: string;
    notifications?: number;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    onShare: React.MouseEventHandler<HTMLButtonElement>;
    onRemove: React.MouseEventHandler<HTMLButtonElement>;
}

const AccountButton: React.SFC<Props> = props => (
    <div className={props.className}>
        <button className="accountButton__button" onClick={props.onClick}>
            <div className="accountButton__icon">
                <em
                    className="text-primary icon-wallet"
                    style={{ fontSize: '32px' }}
                />
            </div>
            <div className="accountButton__info">
                <div className="accountButton__name">{props.name}</div>
                <div className="accountButton__account">{props.account}</div>
            </div>
        </button>
        {0 < props.notifications && (
            <div className="accountButton__badge">
                {Math.min(99, props.notifications)}
            </div>
        )}
        <DropdownButton
            className="accountButton__controls"
            align="right"
            content={
                <div>
                    {/* <Item onCLick={props.onEdit} icon="icon-note">Edit</Item> */}
                    <Item onClick={props.onShare} icon="icon-share">
                        Share
                    </Item>
                    <Item
                        onClick={props.onRemove}
                        icon="icon-trash text-danger"
                    >
                        Remove
                    </Item>
                </div>
            }
        >
            <MoreVertical size={24} />
        </DropdownButton>
    </div>
);

export default themed(AccountButton)`
    display: flex;
    flex-direction: row;
    border: solid 1px transparent;
    border-radius: 4px;
    align-items: center;
    padding-right: 10px;

    &:hover {
        border-color: #d9eaf9;

        .accountButton__controls {
            color: #666;
        }
    }

    .accountButton__button {
        display: flex;
        flex-direction: row;
        align-items: center;
        text-align: left;
        padding: 10px;
        background: 0;
        cursor: pointer;
        width: 100%;
        overflow: hidden;
        border: 0;
        outline: 0;
    }

    .accountButton__info {
        overflow: hidden;
        flex: 1;
    }

    .accountButton__icon {
        width: 50px;
        height: 50px;
        margin-right: 12px;
        border-radius: 2px;
        background: #f0f0f0;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .accountButton__name {
        color: #5f707f;
        font-size: 15px;
        font-weight: bold;
        margin-bottom: 3px;
        white-space: pre;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .accountButton__account {
        color: #ababab;
        font-size: 14px;
    }

    .accountButton__badge {
        margin-left: 10px;
        border-radius: 2px;
        height: 32px;
        width: 32px;
        min-width: 32px;
        min-height: 32px;
        line-height: 32px;
        text-align: center;
        color: #fff;
        background: #bf6f6f;
        font-weight: bold;
    }

    .accountButton__controls {
        margin-left: 10px;
        border-radius: 2px;
        height: 32px;
        min-width: 32px;
        padding: 4px 2px 2px;
        text-align: center;
        border: 0;
        outline: 0;
        cursor: pointer;
        background: 0;
        color: #ccc;

        &:hover {
            background: #eee;
        }

        &:active {
            background: #ddd;
        }
    }
`;
