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
import styled from 'styled-components';

export interface IContextButtonProps {
    className?: string;
    icon: string;
    description: React.ReactNode;
    onClick: () => void;
}

const ContextButton: React.SFC<IContextButtonProps> = props => (
    <button className={props.className} onClick={props.onClick}>
        <div className="button-icon">
            <em className={props.icon} />
        </div>
        <div>
            <div className="button-label">
                {props.children}
            </div>
            <div className="button-desc">{props.description}</div>
        </div>
    </button>
);

export default styled(ContextButton)`
    display: block;
    width: 100%;
    height: 40px;
    color: #4085dc;
    border: 0;
    background: 0;
    padding: 0;
    margin: 10px 0 15px 0;
    text-align: left;

    &:hover {
        color: #76a6e2;
    }

    .button-icon {
        vertical-align: top;
        text-align: center;
        float: left;
        width: 40px;
        height: 40px;
        line-height: 40px;
        font-size: 22px;
        margin-right: 5px;
    }

    .button-label {
        font-size: 16px;
    }

    .button-desc {
        color: #909FA7;
    }
`;