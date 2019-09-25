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
import classNames from 'classnames';
import themed from 'components/Theme/themed';

interface Props {
    className?: string;
    block?: boolean;
    disabled?: boolean;
    type?: 'primary' | 'link';
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.SFC<Props> = props => {
    const { block, type, ...buttonProps } = props;
    return (
        <button
            {...buttonProps}
            className={classNames(
                {
                    button_block: block
                },
                `button_${props.type || 'primary'}`,
                props.className
            )}
        >
            {props.children}
        </button>
    );
};

export default themed(Button)`
    padding: 7px 15px 8px;
    color: #fff;
    font-size: 15px;
    font-weight: bold;
    border-radius: 2px;
    border: 0;
    transition: background 0.2s, color 0.2s;

    &.button_block {
        clear: both;
        display: block;
        width: 100%;
    }

    &.button_primary {
        background: #5c87b7;
        
        &:hover {
            background: #6e95c1;
        }

        &:active {
            background: #4a719c !important;
            color: #e8e8e8;
        }

        &:focus {
            background: #6e95c1;
        }

        &:disabled {
            background: #adb3bb;
            color: #dadada;
        }
    }

    &.button_link {
        background: 0;
        color: #4286c1;
        font-weight: normal;

        &:hover,&:active,&:focus {
            background: 0;
        }

        &:hover {
            color: #7fb5e4;
        }
    }
`;
