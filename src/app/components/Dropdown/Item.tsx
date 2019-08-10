/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import themed from 'components/Theme/themed';
import classNames from 'classnames';
import propTypes from 'prop-types';

const StyledItem = themed.button`
    border-radius: 0;
    outline: 0;
    border: 0;
    background: 0;
    transition: background .15s;
    width: 100%;
    padding: 0 12px !important;
    margin: 0;
    height: 40px;
    line-height: 40px;
    font-size: 13px;
    font-weight: 500;
    text-decoration: none;
    color: ${props => props.theme.dropdownMenuForeground};
    cursor: pointer;
    display: block;
    text-align: left;
    border: dashed 1px transparent;

    > .item__icon {
        float: left;
        font-weight: 500;
        font-size: 15px;
        line-height: 40px;
        margin-right: 12px;
    }

    &[disabled] {
        color: ${props => props.theme.dropdownMenuDisabled};
    }

    &:hover {
        background: ${props => props.theme.dropdownMenuActive};
    }

    &:focus {
        border-color: #84baff;
    }
`;

interface Props {
    icon?: string;
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Item: React.SFC<Props> = (props, context) => {
    const handleClick: React.MouseEventHandler<HTMLButtonElement> = e => {
        context.closeDropdown();
        if (props.onClick) {
            props.onClick(e);
        }
    };

    return (
        <StyledItem disabled={props.disabled} onClick={handleClick}>
            {props.icon && <em className={classNames('item__icon', props.icon)} />}
            {props.children}
        </StyledItem>
    );
};

Item.contextTypes = {
    closeDropdown: propTypes.func.isRequired
};

export default Item;