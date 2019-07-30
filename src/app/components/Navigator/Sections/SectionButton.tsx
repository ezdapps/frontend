/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { generateRoute } from 'services/router';

import themed from 'components/Theme/themed';

const StyledSectionButton = themed(Link)`
    position: relative;
    border-radius: 0;
    padding: 10px 0 4px 0;
    margin: 0;
    outline: 0;
    border: 0;
    background: 0;
    color: ${props => props.theme.headerForegroundMuted};
    font-size: 15px;
    font-weight: 300;
    transition: background .15s;
    display: inline-block;
    border-bottom: solid 1.5px transparent;
    line-height: normal;
    text-align: center;

    && {
        text-decoration: none;
    }

    &.active {
        border-bottom-color: ${props => props.theme.headerBackgroundActive};
        color: ${props => props.theme.headerForeground};
    }
`;

export interface ISectionButtonProps {
    section: string;
    page: string;
    params: { [name: string]: string };
    active?: boolean;
    onClose?: () => void;
}

const SectionButton: React.SFC<ISectionButtonProps> = props => (
    <StyledSectionButton
        className={classNames({ active: props.active })}
        to={generateRoute(`/browse/${props.section}/${props.page}`, props.params)}
    >
        {props.children}
    </StyledSectionButton>
);

export default SectionButton;