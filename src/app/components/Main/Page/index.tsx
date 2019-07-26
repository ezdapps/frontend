/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import Protypo from 'containers/Widgets/Protypo';
import { IPage } from 'apla/content';
import { STATIC_PAGES } from 'lib/staticPages';

import Error from './Error';
import Timeout from './Timeout';
import NotFound from './NotFound';

export interface IPageProps {
    section: string;
    value: IPage;
}

const Page: React.SFC<IPageProps> = props => {
    if (props.value.error) {
        switch (props.value.error) {
            case 'E_HEAVYPAGE': return (<Timeout />);
            case 'E_NOTFOUND': return (<NotFound />);
            default: return (<Error error={props.value.error} />);
        }
    }
    else {
        const staticPage = STATIC_PAGES[props.value.name];
        return (
            <div className="fullscreen" style={{ backgroundColor: '#fff', maxHeight: '100%', overflowX: 'hidden', overflowY: 'auto' }}>
                {props.value.static && (
                    staticPage.render(props.value.params)
                )}
                {!props.value.static && (
                    <Protypo
                        context="page"
                        section={props.section}
                        page={props.value.name}
                        content={props.value.content}
                    />
                )}
            </div>
        );
    }
};

export default Page;