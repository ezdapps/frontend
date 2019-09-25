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

export interface IToolButtonProps {
    title?: string;
    icon?: string;
    page?: string;
    pageparams?: {
        [name: string]: string;
    };
    onClick: (e: any) => void;
}

const StyledToolButton = themed.button`
    border: 0;
    background: 0;
    outline: 0;
    border: 0;
    height: 35px;
    line-height: 35px;
    white-space: nowrap;
    padding: 0 10px;
    transition: background ease-in-out .12s;

    &:hover {
        background: rgba(0,0,0,0.05);
    }
    
    .toolbutton__icon {
        font-size: 16px;
        color: #4688ff;
        margin-right: 8px;
    }
    
    .toolbutton__label {
        vertical-align: top;
        white-space: nowrap;
        font-size: 15px;
        color: #333;
    }
`;

const ToolButton: React.SFC<IToolButtonProps> = props => {
    return (
        <StyledToolButton onClick={props.onClick}>
            <em className={classNames('toolbutton__icon', props.icon)} />
            <span className="toolbutton__label">
                {props.title}
            </span>
        </StyledToolButton>
    );
};

export default ToolButton;