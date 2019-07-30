/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import { IPage, IBreadcrumb } from 'apla/content';

import Page from '../Page';
import Breadcrumbs from './Breadcrumbs';

export interface ISectionProps {
    name: string;
    page?: IPage;
    navigationSize: number;
    breadcrumbs: IBreadcrumb[];
}

const Section: React.SFC<ISectionProps> = props => (
    <div className="fullscreen" style={{ marginLeft: props.navigationSize }}>
        <Breadcrumbs values={props.breadcrumbs} />
        <div className="fullscreen" style={{ position: 'relative' }}>
            {props.page && (
                <Page value={props.page} section={props.name} />
            )}
        </div>
    </div>
);

export default Section;