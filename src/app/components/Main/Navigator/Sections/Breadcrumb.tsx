/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import PageLink from 'components/Routing/PageLink';

interface Props {
    home?: boolean;
    active: boolean;
    section: string;
    title: string;
    page: string;
    params: {
        [key: string]: string;
    };
}

const Breadcrumb: React.SFC<Props> = props => {
    const titleText = props.title || props.page;
    const title = props.home ?
        (
            <em className="fa fa-home" style={{ fontSize: 17 }} />
        )
        :
        (
            <span>{titleText}</span>
        );

    if (!props.active) {
        return (
            <span>{title}</span>
        );
    }

    return (
        <PageLink
            section={props.section}
            page={props.page}
            params={props.params}
        >
            {title}
        </PageLink>
    );
};

export default Breadcrumb;