/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { ISection, IBreadcrumb } from 'apla/content';

const findBreadcrumb = (section: ISection, breadcrumb: IBreadcrumb) => {
    const pageIndex = section.breadcrumbs.findIndex(m =>
        m.page === breadcrumb.page
    );

    if (-1 !== pageIndex) {
        return pageIndex;
    }

    const callerIndex = section.breadcrumbs.findIndex(m =>
        m.caller === breadcrumb.caller && m.type === breadcrumb.type
    );

    return callerIndex;
};

export default findBreadcrumb;