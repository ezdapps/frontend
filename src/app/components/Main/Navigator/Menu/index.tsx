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
import { IMenu } from 'apla/content';

import StackGroup from 'components/Animation/StackGroup';
import themed from 'components/Theme/themed';
import Protypo from 'containers/Widgets/Protypo';
import ScrollView from 'components/ScrollView';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import media from 'components/Theme/media';

const StyledNavigation = themed.aside`
    background: ${props => props.theme.menuBackground};
    width: ${props => props.theme.menuSize}px;
    transition: width ease-in-out .12s;

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

    @media(${media.md}) {
        display: none;
    }
`;

const StyledBackButton = themed.button`
    position: relative;
    display: block;
    width: 100%;
    height: 58px;
    padding: 10px 20px;
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
        width: 35px;
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
    menus: IMenu[];
    section: string;
    active: boolean;
    folded: boolean;
    menuPop: () => void;
    onMouseOver?: () => void;
    onMouseLeave?: () => void;
}

const Menu: React.SFC<Props> = props => (
    <StyledNavigation
        className={classNames({
            menu_folded: props.folded,
            menu_active: props.active
        })}
        onMouseOver={props.onMouseOver}
        onMouseLeave={props.onMouseLeave}
    >
        <nav>
            <StyledMenu>
                <StackGroup
                    items={props.menus.map((menu, index) => (
                        <ScrollView disableHorizontal>
                            <StyledMenuContent>
                                {index > 0 && (
                                    <StyledBackButton
                                        onClick={() => props.menuPop()}
                                    >
                                        <div className="title-wrap">
                                            <span className="icon">
                                                <em className="icon-arrow-left" />
                                            </span>
                                            <span>
                                                <FormattedMessage
                                                    id="navigation.return"
                                                    defaultMessage="Return"
                                                />
                                            </span>
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
    </StyledNavigation>
);

export default Menu;
