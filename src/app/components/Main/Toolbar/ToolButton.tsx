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
import media from 'components/Theme/media';

interface Props {
    disabled?: boolean;
    icon?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const StyledToolButton = themed.button`
    background: 0;
    outline: 0;
    border: 0;
    padding: 0 10px;
    height: ${props => props.theme.toolbarHeight}px;
    line-height: inherit;

    &:hover {
        background: ${props => props.theme.toolbarBackgroundFocused};
    }

    &:active {
        background: ${props => props.theme.toolbarBackgroundActive};
    }

    &:disabled {
        &:hover, &:active {
            background: 0;
        }

        .toolbutton__icon, .toolbutton__label {
            color: ${props => props.theme.toolbarForegroundDisabled};
        }
    }

    .toolbutton__icon {
        line-height: inherit;
        margin-right: 7px;
        font-size: 16px;
        color: ${props => props.theme.toolbarForegroundPrimary};
    }
    
    .toolbutton__label {
        vertical-align: top;
        line-height: inherit;
        font-size: 14px;
        font-weight: 600;
        color: ${props => props.theme.toolbarForeground};

        > * {
            vertical-align: top;
        }
    }

    @media (${media.sm}) {
        .toolbutton__label {
            display: none;
        }

        .toolbutton__icon {
            margin-right: 0;
        }
    }
`;

const ToolButton: React.SFC<Props> = props => (
    <StyledToolButton disabled={props.disabled} onClick={props.onClick}>
        {props.icon && (
            <em className={classNames('toolbutton__icon', props.icon)} />
        )}
        <span className="toolbutton__label">
            {props.children}
        </span>
    </StyledToolButton>
);

export default ToolButton;