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

export interface ISecurityWarningProps {
    className?: string;
    close: () => void;
}

const SecurityWarning: React.SFC<ISecurityWarningProps> = props => (
    <div className={props.className}>
        <div>
            {props.children}
            <a href="#" onClick={() => props.close()}><em className="icon icon-close" /></a>
        </div>
    </div>
);

export default themed(SecurityWarning)`    
    background: ${props => props.theme.securityWarningBackground};
    color: ${props => props.theme.securityWarningForeground};
    position: fixed;
    top: 5px;
    left: 50%;
    margin-left: -150px;
    width: 300px;
    padding: 10px 25px 10px 20px;
    line-height: 20px;
    z-index: 20000;
    div {
        position: relative;
    }
    a {
        position: absolute;
        right: -5px;
        top: 50%;
        line-height: 20px;
        margin-top: -10px;
        color: ${props => props.theme.securityWarningForeground};
        text-decoration: none;
    }
`;
