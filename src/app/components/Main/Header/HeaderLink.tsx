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
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import themed from 'components/Theme/themed';

const StyledHeaderLink = themed(Link)`
    position: relative;
    border-radius: 0;
    padding: 9px 0 2px 0;
    margin: 0 0 8px 0; 
    outline: 0;
    border: 0;
    background: 0;
    color: ${props => props.theme.menubarForeground};
    font-size: 15px;
    font-weight: 600;
    transition: background .15s;
    display: inline-block;
    border-bottom: solid 2px transparent;
    line-height: normal;
    text-align: center;
    transition: color ease-in-out .12s;

    && {
        text-decoration: none;
    }

    &:hover {
        color: ${props => props.theme.menubarForegroundActive};
    }

    &.active {
        border-bottom-color: ${props => props.theme.menubarBackgroundActive};
        color: ${props => props.theme.menubarForegroundActive};
    }
`;

interface Props {
    to: string;
    active?: boolean;
}

const HeaderLink: React.SFC<Props> = props => (
    <StyledHeaderLink
        className={classNames({ active: props.active })}
        to={props.to}
    >
        {props.children}
    </StyledHeaderLink>
);

export default HeaderLink;