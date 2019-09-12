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
    type?: 'brand' | 'default';
    header?: React.ReactNode;
    footer?: React.ReactNode;
}

const Window: React.SFC<Props> = props => (
    <div className={classNames(props.className, `window_${props.type}`)}>
        <div className="window__layout">
            {props.header && (
                <div className="window__header">{props.header}</div>
            )}
            <div className="window__body">{props.children}</div>
            {props.footer && (
                <div className="window__footer">
                    <div className="window__footer__content">
                        {props.footer}
                    </div>
                </div>
            )}
        </div>
    </div>
);

export default themed(Window)`
    display: flex;
    min-height: 100vh;
    min-height: calc(var(--vh, 1vh) * 100);
    justify-content: center;
    align-items: center;
    flex-direction: column;

    &.window_brand {
        > .window__layout {
            grid-template-rows: 85px auto 80px;

            > .window__header {
                height: 85px;
            }
        }
    }

    > .window__layout {
        border-radius: 2px;
        overflow: hidden;
        background: #fff;
        box-shadow: rgba(0, 0, 0, 0.16) 0 3px 20px;
        display: grid;
        grid-template-rows: 40px 1fr 80px;
        grid-template-columns: 400px;
        grid-template-areas:
            'header'
            'body'
            'footer';
        
        > .window__header {
            background: #3873a6;
            grid-area: header;
            max-width: 100vw;
            z-index: 5;
        }
    
        > .window__body {
            grid-area: body;
            max-width: 100vw;
            z-index: 4;
            border: solid 1px #479be3;
            border-top: 0;
            border-bottom: 0;
        }
    
        > .window__footer {
            grid-area: footer;
            max-width: 100vw;
            border: solid 1px #479be3;
            border-top: 0;
            background: #e9e9e9;
            border-radius: 0 0 2px 2px;
            z-index: 5;
    
            .window__footer__content {
                border-top: solid 1px #dae4ec;
                padding: 22px;
            }
        }
    }

    @media (${media.lg}) {
        justify-content: stretch;
        align-items: stretch;

        @media (display-mode: standalone) {
            min-height: 100vh;

            > .window__layout {
                min-height: 100vh;
            }
        }

        > .window__layout {
            flex: 1;
            min-height: 100vh;
            min-height: calc(var(--vh, 1vh) * 100);
            grid-template-columns: 1fr;
            box-shadow: none;

            > .window__header {
                padding-top: env(safe-area-inset-top);
                padding-left: env(safe-area-inset-left);
                padding-right: env(safe-area-inset-right);
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                height: 40px;
                box-sizing: content-box;
            }
    
            > .window__body {
                margin-top: env(safe-area-inset-top);
                margin-bottom: env(safe-area-inset-bottom);
                margin-left: env(safe-area-inset-left);
                margin-right: env(safe-area-inset-right);
                box-sizing: content-box;
                border: 0;
            }
    
            > .window__footer {
                padding-bottom: env(safe-area-inset-bottom);
                padding-left: env(safe-area-inset-left);
                padding-right: env(safe-area-inset-right);
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                height: 80px;
                box-sizing: content-box;
                border-left: 0;
                border-right: 0;
                border-bottom: 0;
                border-radius: 0;
            }
        }
    }
`;
