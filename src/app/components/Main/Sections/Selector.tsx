/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';

import SectionButton from './SectionButton';

export interface ISectionsProps {
    section: string;
    values: {
        title: string;
        name: string;
        page: string;
        params?: {
            [name: string]: string;
        }
    }[];
}

const Selector: React.SFC<ISectionsProps> = (props) => (
    <>
        {props.values.map(section => (
            <li key={section.name}>
                <SectionButton
                    active={props.section === section.name}
                    section={section.name}
                    page={section.page}
                    params={section.params}
                >
                    {section.title}
                </SectionButton>
            </li>

        ))}
    </>
);

export default Selector;