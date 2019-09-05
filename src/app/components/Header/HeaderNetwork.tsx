/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import themed from 'components/Theme/themed';

interface Props {
    className?: string;
    status: 'PENDING' | 'ONLINE' | 'OFFLINE';
}

const NetworkIndicator: React.SFC<Props> = props => (
    <div className={props.className}>
        <em className="button-icon" />
    </div>
);

export default themed(NetworkIndicator)`
    text-decoration: none !important;
    border: 0;
    background: 0;
    padding: 0;
    color: #fff;
    font-size: 14px;

    &:hover {
        color: #76a6e2;
    }

    .button-icon {
        margin-left: 8px;
        width: 8px;
        height: 8px;
        background-color: #ccc;
        border-radius: 100%;
        display: inline-block;
        vertical-align: middle;

        ${props =>
            'PENDING' === props.status ? 'background-color: #E6C366' : ''};
        ${props =>
            'ONLINE' === props.status ? 'background-color: #6AC751' : ''};
    }
`;
