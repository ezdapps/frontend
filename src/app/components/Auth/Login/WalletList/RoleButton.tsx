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

export interface IRoleButtonProps {
    className?: string;
    badge: number;
    onClick: () => void;
}

const StyledRoleButton = themed.button`
    background: transparent;
    border: solid 1px #4c7dbd;
    border-radius: 2px;
    outline: none;
    font-size: 14px;
    color: #4c7dbd;
    height: 25px;
    line-height: 23px;
    padding: 0;
    vertical-align: top;

    &:hover {
        background: #e9e9e9;
    }
    
    .button-content {
        padding: 0 6px;
        float: left;
        height: 100%;
    }

    .button-badge {
        float: right;
        font-weight: bold;
        height: 100%;
        padding: 0 5px;
        color: #ea4f4f;
    }
`;

const RoleButton: React.SFC<IRoleButtonProps> = (props) => (
    <StyledRoleButton className={props.className} onClick={props.onClick}>
        <div className="button-content">{props.children}</div>
        {0 !== props.badge && (
            <div className="button-badge">{props.badge}</div>
        )}
    </StyledRoleButton>
);

export default RoleButton;