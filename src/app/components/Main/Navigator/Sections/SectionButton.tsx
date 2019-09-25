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
import { generateRoute } from 'services/router';

import HeaderLink from 'components/Main/Header/HeaderLink';

interface Props {
    section: string;
    page: string;
    params: { [name: string]: string };
    active?: boolean;
}

const SectionButton: React.SFC<Props> = props => (
    <HeaderLink to={generateRoute(`/browse/${props.section}/${props.page}`, props.params)} active={props.active}>
        {props.children}
    </HeaderLink>
);

export default SectionButton;