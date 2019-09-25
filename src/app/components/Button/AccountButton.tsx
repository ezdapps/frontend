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
import { MoreVertical } from 'react-feather';
import themed from 'components/Theme/themed';
import DropdownButton from './DropdownButton';
import Item from 'components/Dropdown/Item';
import classNames from 'classnames';

type Badge = {
    type?: 'primary' | 'warning';
    value: string;
};

const ButtonBadge: React.SFC<{ value: Badge | number }> = props => {
    const badge: Badge =
        'number' === typeof props.value
            ? {
                  type: 'primary',
                  value: String(props.value)
              }
            : props.value;

    if (0 === props.value) {
        return null;
    } else {
        const className = classNames(
            'accountButton__badge',
            `accountButton__badge_${badge.type}`
        );
        return (
            <div className={className}>
                {'number' === typeof props.value ? (
                    <span>{Math.min(99, props.value)}</span>
                ) : (
                    <em className={props.value.value} />
                )}
            </div>
        );
    }
};

interface Props {
    className?: string;
    name: string;
    account?: string;
    badge?: Badge | number;
    last?: boolean;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    onShare: React.MouseEventHandler<HTMLButtonElement>;
    onRemove: React.MouseEventHandler<HTMLButtonElement>;
}

const AccountButton: React.SFC<Props> = props => (
    <div className={props.className}>
        <button
            className="accountButton__button"
            onClick={props.onClick}
            disabled={!props.account}
        >
            <div
                className="accountButton__icon"
                style={{ position: 'relative' }}
            >
                <em
                    className="text-primary icon-wallet"
                    style={{ fontSize: '32px' }}
                />

                {props.badge ? <ButtonBadge value={props.badge} /> : null}
            </div>
            <div className="accountButton__info">
                <div className="accountButton__name">{props.name}</div>
                {props.account ? (
                    <div className="accountButton__account">
                        {props.account}
                    </div>
                ) : (
                    <div className="accountButton__inactive">
                        Your account is being validated. You will receive an
                        email notification after the process has been completed
                    </div>
                )}
            </div>
        </button>
        <DropdownButton
            className="accountButton__controls"
            align="right"
            direction={props.last ? 'up' : 'down'}
            dropdownStyle={{
                position: 'absolute',
                right: '100%',
                top: 0,
                marginTop: props.last ? '-50%' : 0
            }}
            content={
                <div>
                    {/* <Item onCLick={props.onEdit} icon="icon-note">Edit</Item> */}
                    {/* <Item onClick={props.onShare} icon="icon-share">
                        Share
                    </Item> */}
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
        align-items: flex-start;
        text-align: left;
        padding: 10px;
        background: 0;
        cursor: pointer;
        width: 100%;
        overflow: hidden;
        border: 0;
        outline: 0;

        &:disabled {
            cursor: default;
        }
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

    .accountButton__inactive {
        color: #ababab;
        font-size: 15px;
    }

    .accountButton__badge {
        bottom: 0px;
        right: 0px;
        width: 24px;
        height: 24px;
        background: rgb(191, 111, 111);
        color: rgb(255, 255, 255);
        font-weight: bold;
        border-radius: 100%;
        text-align: center;
        line-height: 24px;
        margin: 0 -6px -6px 0;
        position: absolute;
        
        > em {
            line-height: 24px;
        }

        &.accountButton__badge_warning {
            background: #e0ab4a;
        }
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
