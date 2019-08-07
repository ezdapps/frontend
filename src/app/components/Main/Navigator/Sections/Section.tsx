/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import { IPage, IBreadcrumb } from 'apla/content';

import Page from '../Page';
import themed from 'components/Theme/themed';

export interface ISectionProps {
    name: string;
    page?: IPage;
    navigationSize: number;
    breadcrumbs: IBreadcrumb[];
}

const StyledSection = themed.div`
    box-shadow: rgba(0,0,0,0.06) -5px 0 10px;
    position: relative;
    z-index: 100;
`;

const Section: React.SFC<ISectionProps> = props => (
    <StyledSection className="fullscreen" style={{ marginLeft: props.navigationSize }}>
        {props.page && (
            <Page value={props.page} section={props.name} />
        )}
    </StyledSection>
);

export default Section;