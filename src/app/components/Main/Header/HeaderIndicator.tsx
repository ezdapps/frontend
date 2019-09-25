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

import Tooltip from 'components/Tooltip';

interface Props {
    icon: string;
    className?: string;
    right?: boolean;
    title: JSX.Element | string;
    titleDesc: JSX.Element | string;
}

const HeaderIndicator: React.SFC<Props> = props => (
    <li className={props.className} style={{ float: props.right ? 'right' : null }}>
        <Tooltip title={props.title} body={props.titleDesc}>
            <div className="tool-body">
                <em className={`tool-icon ${props.icon}`} />
                {props.children && (<span className="button-label">{props.children}</span>)}
            </div>
        </Tooltip>
    </li>
);

const StyledHeaderIndicator = themed(HeaderIndicator)`
    display: inline-block;
    vertical-align: top;
    text-align: center;
    font-size: 14px;
    font-weight: 300;
    line-height: 40px;

    .tool-body {
        min-width: 40px;
        height: 40px;
        padding: 0 12px;
        font-weight: 300;

        em.tool-icon {
            color: ${props => props.theme.menubarForeground};
            transition: color .15s;
            vertical-align: middle;
            height: 18px;
            display: inline-block;
        }

        > span.button-label {
            margin-left: 8px;
            color: ${props => props.theme.menubarForeground};
        }

        &:hover {
            em.tool-icon {
                color: ${props => props.theme.menubarForegroundActive};
            }
        }
    }
`;

export default StyledHeaderIndicator;