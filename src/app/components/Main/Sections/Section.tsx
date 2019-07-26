/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import { IPage, IBreadcrumb } from 'apla/content';

import Page from 'components/Main/Page';
import themed from 'components/Theme/themed';
import Breadcrumbs from './Breadcrumbs';

export interface ISectionProps {
    name: string;
    page?: IPage;
    navigationSize: number;
    breadcrumbs: IBreadcrumb[];
}

const StyledContent = themed.section`
    && { background: ${props => props.theme.contentBackground}; }
    color: ${props => props.theme.contentForeground};
    transition: none !important;
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const Section: React.SFC<ISectionProps> = props => (
    <div className="fullscreen" style={{ marginLeft: props.navigationSize }}>
        <Breadcrumbs values={props.breadcrumbs} />
        <StyledContent>
            <div className="flex-stretch" style={{ position: 'relative' }}>
                {props.page && (
                    <div className="content-page">
                        <Page value={props.page} section={props.name} />
                    </div>
                )}
            </div>
        </StyledContent>
    </div>
);

export default Section;