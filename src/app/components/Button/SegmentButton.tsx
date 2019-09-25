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
import classNames from 'classnames';

import themed from 'components/Theme/themed';

interface Props {
    className?: string;
    disabled?: boolean;
    activeIndex: number;
    items: React.ReactNode[];
    onChange?: (index: number) => void;
}

const SegmentButton: React.SFC<Props> = props => (
    <ul className={classNames('button-sections', props.className)}>
        {props.items.map((l, i) => (
            <li key={i} className={props.activeIndex === i ? 'active' : null}>
                <button type="button" onClick={props.onChange && props.onChange.bind(null, i)}>
                    {l}
                </button>
            </li>
        ))}
    </ul>
);

const StyledSegmentButton = themed(SegmentButton)`
    border: solid 1px ${props => props.theme.sectionButtonOutline};
    border-radius: 2px;
    list-style-type: none;
    padding: 0;
    margin: 0;
    font-size: 0;
    display: inline-block;
    line-height: 20px;
    height: 22px;

    li {
        display: inline-block;

        button {
            background: 0;
            outline: 0;
            border: 0;
            border-right: solid 1px ${props => props.theme.sectionButtonOutline};
            height: 20px;
            font-size: 13px;
            padding: 0 10px;
            color: ${props => props.theme.sectionButtonForeground};
        }

        &:last-child button {
            border-right: 0;
        }

        &:hover button {
            background: ${props => props.theme.sectionButtonBackground};
        }
        
        &.active button {
            background: ${props => props.theme.sectionButtonActive};
            color: ${props => props.theme.sectionButtonPrimary};
        }
    }
`;

export default StyledSegmentButton;