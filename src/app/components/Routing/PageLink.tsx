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
import { Link } from 'react-router-dom';
import { generateRoute } from 'services/router';
import { TBreadcrumbType } from 'apla/content';

export interface IPageLinkProps {
    className?: string;
    section: string;
    page: string;
    params?: {
        [key: string]: string
    };
    from?: {
        name: string;
        title?: string;
        type: TBreadcrumbType;
    };
}

const PageLink: React.SFC<IPageLinkProps> = props => (
    <Link
        to={{
            pathname: generateRoute(`/browse/${props.section}/${props.page}`, props.params),
            state: {
                from: props.from
            }
        }}
        className={props.className}
    >
        {props.children}
    </Link>
);

export default PageLink;