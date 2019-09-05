/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import themed from 'components/Theme/themed';

export const Filler: React.SFC = props => (
    <div className="toolbar__filler">
        {props.children}
    </div>
);

export default themed.div`
    background: ${props => props.theme.toolbarBackground};
    min-height: ${props => props.theme.toolbarHeight}px;
    height: ${props => props.theme.toolbarHeight}px;
    line-height: ${props => props.theme.toolbarHeight}px;
    color: ${props => props.theme.toolbarForeground};
    padding: 0 10px;
    margin: 0;
    position: relative;
    z-index: 110;
    white-space: nowrap;
    display: flex;
    flex-direction: row;
    align-items: flex-start;

    .toolbar__filler {
        flex: 1;
    }
`;