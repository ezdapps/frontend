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

export const Filler: React.SFC = props => (
    <div className="toolbar__filler">
        {props.children}
    </div>
);

export default themed.div`
    box-shadow: rgba(0,0,0,0.07) 0 2px 5px;
    background: ${props => props.theme.toolbarBackground};
    border-bottom: solid 1px ${props => props.theme.uiBorderLight};
    min-height: ${props => props.theme.toolbarHeight}px;
    height: ${props => props.theme.toolbarHeight}px;
    line-height: ${props => props.theme.toolbarHeight}px;
    color: ${props => props.theme.toolbarForeground};
    padding: 0 10px;
    margin: 0;
    position: relative;
    z-index: 110;
    white-space: nowrap;
    display: flex;
    flex-direction: row;
    align-items: flex-start;

    .toolbar__filler {
        flex: 1;
    }
`;