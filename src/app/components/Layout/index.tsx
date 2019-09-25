// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

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
    display: grid;
    width: 100vw;
    height: 100vh;
    height: ${media.standalone ? '100vh' : 'calc(var(--vh, 1vh) * 100)'};
    
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
