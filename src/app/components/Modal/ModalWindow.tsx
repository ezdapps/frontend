/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *---------------------------------------------------------------------------------------------*/

import React from 'react';
import themed from 'components/Theme/themed';
import * as Icons from 'react-feather';
import classNames from 'classnames';

interface Props {
    className?: string;
    icon?: keyof typeof Icons;
    title: React.ReactNode;
    controls?: React.ReactNode;
    width?: number;
    onClose: () => void;
}

const ModalWindow: React.SFC<Props> = props => {
    const Icon = Icons[props.icon];

    return (
        <div className={props.className}>
            {Icon && (
                <aside className="modalWindow__aside">
                    <Icon size={55} />
                </aside>
            )}
            <section
                className={classNames('modalWindow__content', {
                    modalWindow_side: !!Icon
                })}
                style={{ maxWidth: props.width }}
            >
                <h3 className="modalWindow__title">
                    <div>{props.title}</div>
                    <button
                        className="modalWindow__close"
                        onClick={props.onClose}
                    >
                        <Icons.X size={20} />
                    </button>
                </h3>
                {props.children}
                {props.controls && (
                    <div className="modalWindow__controls">
                        {props.controls}
                    </div>
                )}
            </section>
        </div>
    );
};

export default themed(ModalWindow)`
    display: flex;
    flex-direction: row;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    text-align: left;
    max-width: 50vw;

    .modalWindow_side {
        .modalWindow__content {
            padding: 20px;
        }
    }

    .modalWindow__aside {
        grid-template: 'aside';
        background: #446C8F;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 140px;
        min-width: 140px;

        > svg {
            stroke: #A2B6C7;
        }
    }

    .modalWindow__content {
        grid-template: 'content';
        background: #fff;
        color: #808080;
        font-size: 14px;
        padding: 20px 20px 20px 30px;
        max-width: 100%;
    }

    .modalWindow__title {
        font-size: 20px;
        position: relative;
        color: #000;
        font-weight: 500;
        margin: 0;
        padding: 0 20px 10px 0;
    }

    .modalWindow__close {
        position: absolute;
        top: 0;
        right: 0;
        background: 0;
        outline: 0;
        border: 0;
        padding: 0;
        margin: 0;
        cursor: pointer;

        > svg {
            stroke: #999;
        }

        &:hover > svg {
            stroke: #ccc;
        }

        &:active > svg {
            stroke: #666;
        }
    }

    .modalWindow__controls {
        margin-top: 20px;
        float: right;
    }

    @media (max-width: 1000px) {
        max-width: none;

        .modalWindow__aside {
            display: none;
        }
        
        .modalWindow__content {
            padding: 20px;
        }
    }
`;
