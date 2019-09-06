/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import classNames from 'classnames';

import themed from 'components/Theme/themed';
import DropdownButton from 'components/Button/DropdownButton';
import media from 'components/Theme/media';

interface Props {
    className?: string;
    disabled?: boolean;
    warning?: boolean;
    badge?: number;
    align?: 'left' | 'right';
    menuWidth?: number;
    content: React.ReactNode;
    onClick?: () => any;
}

const StyledHeaderButton = themed(DropdownButton)`
    background: 0;
    padding: 0;
    border: 0;
    outline: 0;
    transition: background ease-in-out .17s;
    min-width: 40px;
    height: 100%;
    
    &:hover {
        background: ${props => props.theme.menubarBackgroundFocused};
    }
    
    &._warning {
        background: ${props => props.theme.menubarBackgroundSecondary};
        color: ${props => props.theme.menubarForegroundActive};
    }
    
    &._active {
        color: ${props => props.theme.menubarForegroundActive};
    }

    .dropdown__badge {
        position: absolute;
        bottom: 0;
        right: 0;
        background: #d46565;
        display: block;
        width: 16px;
        height: 16px;
        padding: 0;
        line-height: 16px;
        font-size: 12px;
        font-weight: bold;
    }

    @media (${media.md}) {
        min-width: 50px;
    }
`;

const HeaderButton: React.SFC<Props> = props => (
    <StyledHeaderButton
        className={classNames(props.className, {
            _warning: props.warning,
            _active: !!props.badge
        })}
        content={props.content}
        disabled={props.disabled}
        align={props.align}
        menuWidth={props.menuWidth}
        onClick={props.onClick}
    >
        {props.children}
        {props.badge ? (
            <em className="dropdown__badge">{Math.min(props.badge, 99)}</em>
        ) : null}
    </StyledHeaderButton>
);

export default HeaderButton;
