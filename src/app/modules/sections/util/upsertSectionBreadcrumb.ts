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

import { ISection, IBreadcrumb } from 'apla/content';
import findBreadcrumb from './findBreadcrumb';

const upsertSectionBreadcrumb = (section: ISection, crumb: IBreadcrumb) => {
    const crumbIndex = findBreadcrumb(section, crumb);
    let breadcrumbs: IBreadcrumb[];

    if (-1 !== crumbIndex) {
        const oldValue = section.breadcrumbs[crumbIndex];

        breadcrumbs = [
            ...section.breadcrumbs.slice(0, crumbIndex).filter(l => 'IGNORE' !== l.type),
            {
                ...section.breadcrumbs[crumbIndex],
                page: crumb.page,
                title: crumb.title || oldValue.title,
                params: crumb.params
            }
        ];
    }
    else {
        breadcrumbs = [
            ...section.breadcrumbs.filter(l => 'IGNORE' !== l.type),
            crumb
        ];
    }

    return breadcrumbs;
};

export default upsertSectionBreadcrumb;