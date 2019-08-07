/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import classNames from 'classnames';

import themed from 'components/Theme/themed';

interface Props {
    icon?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const StyledToolButton = themed.button`
    background: 0;
    outline: 0;
    border: 0;
    padding: 0 10px;
    height: 100%;
    line-height: inherit;

    &:hover {
        background: ${props => props.theme.toolbarBackgroundFocused};
    }

    &:active {
        background: ${props => props.theme.toolbarBackgroundActive};
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
        color: ${props => props.theme.toolbarForeground};

        > * {
            vertical-align: top;
        }
    }
`;

const ToolButton: React.SFC<Props> = props => (
    <StyledToolButton onClick={props.onClick}>
        {props.icon && (
            <em className={classNames('toolbutton__icon', props.icon)} />
        )}
        <span className="toolbutton__label">
            {props.children}
        </span>
    </StyledToolButton>
);

export default ToolButton;