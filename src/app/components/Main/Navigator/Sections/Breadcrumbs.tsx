/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import { IBreadcrumb } from 'apla/content';

import themed from 'components/Theme/themed';
import Toolbar from 'components/Main/Toolbar';
import Breadcrumb from './Breadcrumb';

export interface IBreadcrumbsProps {
    values: IBreadcrumb[];
}

const StyledBreadcrumbs = themed.ul`
    height: 100%;
    line-height: inherit;
    margin: 0;
    padding: 0;
    font-size: 0;
    
    > li {
        display: inline-block;
        font-size: 13px;
        font-weight: 400;
        height: 45px;
        color: ${props => props.theme.toolbarForegroundActive};
        margin-right: 10px;

        &:first-child:before {
            content: none;
        }

        &:before {
            content: '/';
            font-size: 13px;
            color: ${props => props.theme.toolbarSpacerForeground};
            display: inline-block;
            margin-right: 8px;
        }
    }
`;

const Breadcrumbs: React.SFC<IBreadcrumbsProps> = (props) => (
    <Toolbar>
        <StyledBreadcrumbs>
            {props.values.map((breadcrumb, i) => (
                <li key={i}>
                    <Breadcrumb
                        home={i === 0}
                        active={i !== props.values.length - 1}
                        section={breadcrumb.section}
                        page={breadcrumb.page}
                        params={breadcrumb.params}
                        title={breadcrumb.title}
                    />
                </li>
            ))}
        </StyledBreadcrumbs>
    </Toolbar>
);

export default Breadcrumbs;