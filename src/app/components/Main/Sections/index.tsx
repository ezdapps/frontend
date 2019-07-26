/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import { ISection } from 'apla/content';

import Section from './Section';
import Navigation from 'containers/Main/Navigation';

export interface ISectionsProps {
    section: string;
    page: string;
    values: {
        [key: string]: ISection;
    };
    navigationSize: number;
}

const Sections: React.SFC<ISectionsProps> = (props) => (
    <div className="fullscreen" style={{ position: 'relative' }}>
        <Navigation section={props.section} />
        <Section
            navigationSize={props.navigationSize}
            name={props.section}
            page={props.values[props.section].page}
            breadcrumbs={props.values[props.section].breadcrumbs}
        />
    </div>
);

export default Sections;