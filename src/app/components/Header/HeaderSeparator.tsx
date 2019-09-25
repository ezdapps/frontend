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
    className?: string;
    children?: never;
}

const HeaderSeparator: React.SFC<Props> = props => (
    <em className={props.className} />
);

export default themed(HeaderSeparator)`
    &:after {
        font-style: normal;
        content: '|';
        display: inline-block;
        margin: -1px 13px 0;
        color: #9cb9d3;
        line-height: 40px;
    }
`;
