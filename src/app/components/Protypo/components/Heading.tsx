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

const StyledHeading = themed.div`
    z-index: 1000;
    font-size: 20px;
    line-height: 45px;
    height: 46px;
    color: #000;
    font-weight: normal;
    margin-top: 10px;
    padding: 0 20px;
    border: 0;
`;

export interface IHeadingProps {
    className?: string;
}

const Heading: React.SFC<IHeadingProps> = props => (
    <StyledHeading className={props.className}>
        <div>
            {props.children}
        </div>
    </StyledHeading >
);

export default Heading;