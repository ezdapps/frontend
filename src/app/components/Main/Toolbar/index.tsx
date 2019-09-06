/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import themed from 'components/Theme/themed';
import media from 'components/Theme/media';

export const Filler: React.SFC = props => (
    <div className="toolbar__filler">
        {props.children}
    </div>
);

export default themed.div`
    background: ${props => props.theme.toolbarBackground};
    height: 100%;
    color: ${props => props.theme.toolbarForeground};
    padding: 0 10px;
    margin: 0;
    position: relative;
    z-index: 110;
    white-space: nowrap;
    display: flex;
    flex-direction: row;
    align-items: center;

    .toolbar__filler {
        flex: 1;
    }

    @media(${media.sm}) {
        padding: 0;
    }
`;