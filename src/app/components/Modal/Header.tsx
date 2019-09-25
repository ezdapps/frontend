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

interface Props {
    onClose: () => void;
}

const StyledHeader = themed.div`
    background: ${props => props.theme.modalHeaderBackground};
    color: ${props => props.theme.modalHeaderForeground};
    margin: -1px -1px 0 -1px;
    height: 40px;
    line-height: 40px;
    padding: 0 15px;

    .header__close {
        border: 0;
        outline: 0;
        background: 0;
        padding: 0;
        position: absolute;
        top: 0;
        right: 0;
        width: 40px;
        height: 40px;
        color: ${props => props.theme.modalHeaderForeground};
        opacity: 0.5;
        font-size: 26px;

        &:hover {
            opacity: 1;
        }
    }
`;

const Header: React.SFC<Props> = props => (
    <StyledHeader>
        <div className="header__title">
            {props.children}
        </div>
        <button type="button" className="header__close" onClick={props.onClose}>&times;</button>
    </StyledHeader>
);

export default Header;