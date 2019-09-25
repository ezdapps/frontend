// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

import React from 'react';
import themed from 'components/Theme/themed';

import SectionButton from './SectionButton';

export interface ISelectorProps {
    section: string;
    values: {
        index: number;
        title: string;
        name: string;
        page: string;
        params: {
            [name: string]: string;
        }
    }[];
}

const StyledSelector = themed.ul`
    margin: 0;
    padding: 0;
    height: 100%;

    > li {
        list-style-type: none;
        height: 100%;
        display: inline-block;
        padding 0 10px;

        &:first-child {
            padding-left: 0;
        }

        &:last-child {
            padding-right: 0;
        }
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