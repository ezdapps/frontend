/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *---------------------------------------------------------------------------------------------*/

import React from 'react';
import themed from 'components/Theme/themed';

interface Props {
    className?: string;
    children?: never;
}

const HeaderSeparator: React.SFC<Props> = props => (
    <em className={props.className} />
);

export default themed(HeaderSeparator)`
    &:after {
        font-style: normal;
        content: '|';
        display: inline-block;
        margin: -1px 13px 0;
        color: #9cb9d3;
        line-height: 40px;
    }
`;
