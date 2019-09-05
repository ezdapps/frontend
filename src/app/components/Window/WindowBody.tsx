/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *---------------------------------------------------------------------------------------------*/

import React from 'react';
import themed from 'components/Theme/themed';

interface Props {
    height?: number;
}

const StyledWindowBody = themed.div`
    border: solid 1px #479be3;
    border-top: 0;
    border-bottom: 0;
    background: #fff;
    overflow-x: hidden;
    overflow-y: auto;

    @media (max-width: 800px) {
        flex: 1;
        border-radius: 0;
        border: 0;
        height: auto !important;
    }

    &:last-child {
        border-radius: 0 0 2px 2px;
    }
`;

const WindowBody: React.SFC<Props> = props => (
    <StyledWindowBody style={{ height: props.height || 'auto' }}>
        {props.children}
    </StyledWindowBody>
);

export default WindowBody;
