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
import HeaderButton from 'components/Main/Header/HeaderButton';
import { Menu } from 'react-feather';
import classNames from 'classnames';
import HeaderSeparator from './HeaderSeparator';
import { Link } from 'react-router-dom';

interface Props {
    className?: string;
    tools?: React.ReactNode;
    vertical?: boolean;
    onMenuClick?: () => any;
}

const Header: React.SFC<Props> = props => (
    <header
        className={classNames(props.className, {
            header_vertical: props.vertical
        })}
    >
        <div className="header__wrapper">
            {props.onMenuClick && (
                <div className="header__menu">
                    <HeaderButton content={null} onClick={props.onMenuClick}>
                        <div className="header__menu__icon">
                            <Menu size={24} color="#fff" />
                        </div>
                    </HeaderButton>
                </div>
            )}
            <Link className="header__logo" to="/">
                <img src="/img/logoHeader.png" />
            </Link>
            {props.children && (
                <>
                    <div className="header__body">{props.children}</div>
                </>
            )}
            {props.tools && <div className="header__tools">{props.tools}</div>}
        </div>
    </header>
);

export default themed(Header)`
    background: #3873a6;
    height: 100%;
    
    .header__wrapper {
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: stretch;
    }

    & .header__logo {
        padding: 12px 0 10px 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        position: relative;
        user-select: none;
        flex: 0;
        height: 100%;
        text-decoration: none;

        > img {
            height: 18px;
            vertical-align: middle;
        }

        &:after {
            content: ' ';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }
    }

    .header__body {
        align-self: center;
        color: #fff;
        font-size: 15px;
        font-weight: bold;
        flex: 1;
        display: flex;
        flex-direction: row;
        justify-items: flex-start;
        align-items: center;
        height: 100%;
    }
    
    .header__menu {
        height: 100%;
        width: ${props => props.theme.menuSizeFolded}px;
        display: none;

        > div, > div > button {
            width: 100%;
        }

        .header__menu__icon {
            display: flex;
            height: 100%;
            justify-content: center;
            align-items: center;
        }
    }

    .header__tools {
        align-self: center;
        padding-right: 14px;
    }

    @media (${media.md}) {
        & .header__wrapper {
            height: 50px;
        }

        & .header__logo {
            padding: 17px 0 15px 10px;
        }

        .header__menu {
            // display: block;
            display: none;
        }
    }

    @media (${media.sm}) {
        .header__menu {
            width: 50px;
        }
    }

    &.header_vertical {
        .header__wrapper {
            flex-direction: column;
            height: 100%;
            align-items: center;
        }

        .header__logo {
            margin-top: 15px;
            padding: 0;
            height: initial;
            flex: 1;
            
            > img {
                height: 32px;
            }
        }

        .header__body {
            height: initial;
        }

        .header__tools {
            display: none;
        }

        ${HeaderSeparator} {
            display: none;
        }
    }
`;
