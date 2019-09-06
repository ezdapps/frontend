/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *---------------------------------------------------------------------------------------------*/

import React from 'react';
import themed from 'components/Theme/themed';
import media from 'components/Theme/media';

interface Props {
    className?: string;
}

const WindowFooter: React.SFC<Props> = props => (
    <footer className={props.className}>
        <div className="windowFooter__content">{props.children}</div>
    </footer>
);

export default themed(WindowFooter)`
    border: solid 1px #479be3;
    border-top: 0;
    background: #e9e9e9;
    border-radius: 0 0 2px 2px;

    .windowFooter__content {
        border-top: solid 1px #dae4ec;
        padding: 22px;
    }

    @media (${media.lg}) {
        border-radius: 0;
        border-left: 0;
        border-right: 0;
        border-bottom: 0;
    }
`;
