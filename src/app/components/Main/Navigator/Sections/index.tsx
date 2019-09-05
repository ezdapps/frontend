/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import { ISection } from 'apla/content';

import Section from './Section';
import Menu from 'containers/Main/Navigator/Menu';
import themed from 'components/Theme/themed';

interface Props {
    className?: string;
    section: string;
    page: string;
    folded: boolean;
    menuActive: boolean;
    values: {
        [key: string]: ISection;
    };
}

const Sections: React.SFC<Props> = (props) => (
    <div className={props.className}>
        <Menu section={props.section} />
        <Section
            name={props.section}
            folded={props.folded}
            menuActive={props.menuActive}
            page={props.values[props.section].page}
            breadcrumbs={props.values[props.section].breadcrumbs}
        />
    </div>
);

export default themed(Sections)`
    height: 100%;
    position: relative;
`;