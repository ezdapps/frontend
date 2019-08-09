/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import { IMenu } from 'apla/content';

import StackGroup from 'components/Animation/StackGroup';
import themed from 'components/Theme/themed';
import Protypo from 'containers/Widgets/Protypo';
import ResizeHandle from 'containers/Main/Navigator/Menu/ResizeHandle';
import ScrollView from 'components/ScrollView';

const StyledNavigation = themed.aside`
    background: ${props => props.theme.menuBackground};

    .scrollarea {
        background: ${props => props.theme.menuBackground};
        height: 100%;
        
        .scrollbar-container {
            opacity: 0;
        }
    }

    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
`;

const StyledBackButton = themed.button`
    position: relative;
    display: block;
    width: 100%;
    height: 58px;
    padding: 10px 25px;
    color: ${props => props.theme.menuPrimaryForeground};
    font-weight: 300;
    text-decoration: none;
    outline: none;
    border: none;
    text-align: left;
    background: transparent;
    
    &.disabled {
        &:hover {
            color: ${props => props.theme.menuPrimaryForeground};
        }
    }

    &:hover {
        color: ${props => props.theme.menuPrimaryActive};
    }

    .icon {
        vertical-align: top;
        display: inline-block;
        width: 30px;
    }

    em {
        font-size: 15px;
    }

    span {
        font-size: 21px;
        font-weight: 300;
    }
`;

const StyledMenu = themed.div`
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
`;

const StyledMenuContent = themed.div`
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: ${props => props.theme.menuBackground};
    z-index: 90;

    .title-wrap {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
`;

interface Props {
    width: number;
    menus: IMenu[];
    section: string;
    menuPop: () => void;
}

const Menu: React.SFC<Props> = props => (
    <StyledNavigation className={true ? '' : 'navigation-collapsed'} style={{ width: props.width }}>
        <nav>
            <StyledMenu>
                <StackGroup
                    items={props.menus.map((menu, index) => (
                        <ScrollView disableHorizontal>
                            <StyledMenuContent>
                                {index > 0 && (
                                    <StyledBackButton onClick={() => props.menuPop()} disabled={1 >= props.menus.length}>
                                        <div className="title-wrap">
                                            <span className="icon">
                                                <em className="icon-arrow-left" />
                                            </span>
                                            <span>{menu.name}</span>
                                        </div>
                                    </StyledBackButton>
                                )}
                                <Protypo
                                    context="menu"
                                    section={props.section}
                                    menu={menu.name}
                                    content={menu.content}
                                />
                            </StyledMenuContent>
                        </ScrollView>
                    ))}
                />
            </StyledMenu>
        </nav>
        <ResizeHandle />
    </StyledNavigation>
);

export default Menu;