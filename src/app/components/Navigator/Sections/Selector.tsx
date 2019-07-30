/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import themed from 'components/Theme/themed';

import SectionButton from './SectionButton';

export interface ISelectorProps {
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

const StyledSelector = themed.ul`
    margin: 0;
    padding: 0;
    height: 100%;
    padding: 0 10px;

    > li {
        list-style-type: none;
        height: 100%;
        display: inline-block;
        padding 0 10px;
    }
`;

const Selector: React.SFC<ISelectorProps> = (props) => (
    <StyledSelector>
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
    </StyledSelector>
);

export default Selector;