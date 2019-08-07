/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import classNames from 'classnames';

import themed from 'components/Theme/themed';
import DropdownButton, { IDropdownButtonProps } from 'components/DropdownButton';

interface Props extends IDropdownButtonProps {
    warning?: boolean;
}

const HeaderButton: React.SFC<Props> = props => (
    <DropdownButton
        className={classNames(props.className, {
            _warning: props.warning,
            _active: !!props.badge
        })}
        content={props.content}
        leftMost={props.leftMost}
        rightMost={props.rightMost}
        align={props.align}
        width={props.width}
        badge={props.badge}
        disabled={props.disabled}
        onClick={props.onClick}
    >
        {props.children}
    </DropdownButton>
);

const StyledHeaderButton = themed(HeaderButton)`
    background: 0;
    padding: 0;
    border: 0;
    outline: 0;
    transition: background ease-in-out .17s;

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
`;

export default StyledHeaderButton;