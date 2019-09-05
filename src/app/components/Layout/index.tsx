/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *---------------------------------------------------------------------------------------------*/

import React from 'react';
import themed from 'components/Theme/themed';
import media from 'components/Theme/media';

interface Props {
    className?: string;
    footer?: React.ReactNode;
}

const Layout: React.SFC<Props> = props => (
    <div className={props.className}>
        <div className="layout_main">{props.children}</div>
        {props.footer && (
            <footer className="layout_footer">{props.footer}</footer>
        )}
    </div>
);

export default themed(Layout)`
    height: 100%;
    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: minmax(auto, 400px);
    grid-template-areas:
        'main'
        'footer';
    justify-content: center;
    align-content: center;

    .layout_main {
        grid-area: main;
    }

    .layout_footer {
        grid-area: footer;
        justify-self: center;
    }

    @media (${media.md}) {
        justify-content: stretch;
        align-content: stretch;
        grid-template-rows: minmax(auto, 100%) 0;
        grid-template-columns: minmax(auto, 100%);

        .layout_footer {
            display: none;
        }
    }
 `;
