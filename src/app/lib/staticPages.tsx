/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import Backup from 'containers/Main/Backup';
import Editor from 'containers/Main/Editor';
import TxInfo from 'containers/StaticPages/TxInfo';

export interface IStaticPage<T = {}, TSubParams = {}> {
    section: string;
    renderSubstitute?: (props?: T) => {
        name: string;
        params: TSubParams;
    };
    render: (section: string, props?: T) => React.ReactNode;
}

const STATIC_PAGES: { [page: string]: IStaticPage<any, any> } = {
    'backup': { section: null, render: () => <Backup /> },
    'editor': { section: 'editor', render: (_section, props: { open?: string, create?: string, name?: string, vde?: string }) => <Editor {...props} /> },
    'txinfo': {
        section: null,
        renderSubstitute: props => ({
            name: props.page,
            params: {
                txhashes: props.txhashes
            }
        }),
        render: (section, props) => <TxInfo section={section} {...props} />
    }
};

export {
    STATIC_PAGES
};