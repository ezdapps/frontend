/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *---------------------------------------------------------------------------------------------*/

import React from 'react';
import themed from 'components/Theme/themed';
import media from 'components/Theme/media';

interface Props {
    className?: string;
    height?: number;
}

const WindowBody: React.SFC<Props> = props => (
    <div className={props.className} style={{ height: props.height || 'auto' }}>
        {props.children}
    </div>
);

export default themed(WindowBody)`
    border: solid 1px #479be3;
    border-top: 0;
    border-bottom: 0;
    background: #fff;
    overflow-x: hidden;
    overflow-y: auto;

    @media (${media.lg}) {
        flex: 1;
        border-radius: 0;
        border: 0;
        height: auto !important;
    }

    &:last-child {
        border-radius: 0 0 2px 2px;
    }
`;
