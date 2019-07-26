/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { ISection, IBreadcrumb } from 'apla/content';
import findBreadcrumb from './findBreadcrumb';

const upsertSectionBreadcrumb = (section: ISection, crumb: IBreadcrumb) => {
    const crumbIndex = findBreadcrumb(section, crumb);
    let breadcrumbs: IBreadcrumb[];

    if (-1 !== crumbIndex) {
        const oldValue = section.breadcrumbs[crumbIndex];
        
        breadcrumbs = [
            ...section.breadcrumbs.slice(0, crumbIndex),
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
            ...section.breadcrumbs,
            crumb
        ];
    }

    return breadcrumbs;
};

export default upsertSectionBreadcrumb;