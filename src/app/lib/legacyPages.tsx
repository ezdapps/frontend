/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import Backup from 'containers/Main/Backup';
import Editor from 'containers/Main/Editor';
import TxInfo from 'containers/StaticPages/TxInfo';

export interface ILegacyPage<T = {}, TSubParams = {}> {
    menu: string;
    section: string;
    renderSubstitute?: (props?: T) => {
        name: string;
        params: TSubParams;
    };
    render: (props?: T) => React.ReactNode;
}

const LEGACY_PAGES: { [page: string]: ILegacyPage<any, any> } = {
    'backup': { section: null, menu: null, render: () => <Backup /> },
    'editor': {
        section: 'editor',
        menu: null,
        render: (props: { open?: string, create?: string, name?: string, vde?: string }) =>
            <Editor {...props} />
    },
    'txinfo': {
        section: null,
        menu: null,
        renderSubstitute: props => ({
            name: props.page,
            params: {
                txhashes: props.txhashes
            }
        }),
        render: props => <TxInfo {...props} />
    }
};

export {
    LEGACY_PAGES
};