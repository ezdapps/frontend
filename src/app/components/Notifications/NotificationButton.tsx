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

export interface INotificationButtonProps {
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const NotificationButton: React.SFC<INotificationButtonProps> = props => (
    <button className={props.className} onClick={props.onClick}>
        {props.children}
    </button>
);

export default styled(NotificationButton) `
    flex: 1;
    background: rgba(255, 255, 255, 0.15);
    height: 30px;
    border: 0;
    color: #fff;
    text-transform: uppercase;
    margin-right: 5px;
    font-size: 13px;
    transition: background ease-in-out .2s;

    &:last-child {
        margin-right: 0;
    }

    &:hover {
        background: rgba(255, 255, 255, 0.2);
    }

    &:active {
        background: rgba(255, 255, 255, 0.1);
    }
`;