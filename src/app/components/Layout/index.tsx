/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *---------------------------------------------------------------------------------------------*/

import React from 'react';
import themed from 'components/Theme/themed';
import media from 'components/Theme/media';
import classNames from 'classnames';

interface Props {
    className?: string;
    footer?: React.ReactNode;
    type: 'window' | 'fullscreen';
}

const Layout: React.SFC<Props> = props => (
    <div className={classNames(props.className, `layout_${props.type}`)}>
        <div className="layout__main">{props.children}</div>
        {props.footer && (
            <footer className="layout__footer">{props.footer}</footer>
        )}
    </div>
);

export default themed(Layout)`
    height: 100%;
    display: grid;
    
    .layout__main {
        grid-area: main;
    }

    .layout__footer {
        grid-area: footer;
        justify-self: center;
    }

    &.layout_window {
        grid-template-rows: auto auto;
        grid-template-columns: minmax(auto, 400px);
        grid-template-areas:
            'main'
            'footer';
        justify-content: center;
        align-content: center;
    
        @media (${media.md}) {
            justify-content: stretch;
            align-content: stretch;
            grid-template-rows: minmax(auto, 100%) 0;
            grid-template-columns: minmax(auto, 100%);
    
            .layout__footer {
                display: none;
            }
        }
    }

    &.layout_fullscreen {
        grid-template-rows: 100% 0;
        grid-template-columns: auto;
        grid-template-areas:
            'main'
            'footer';
        justify-content: stretch;
        align-content: stretch;

        .layout__footer {
            display: none;
        }
    }
`;
