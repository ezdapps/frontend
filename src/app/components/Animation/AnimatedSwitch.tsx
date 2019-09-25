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

import * as React from 'react';
import { AnimatedSwitch as NativeAnimatedSwitch } from 'react-router-transition';

export interface IAnimation {
    atEnter: { [key: string]: any };
    atLeave: { [key: string]: any };
    atActive: { [key: string]: any };
    mapStyles?: (styles: { [key: string]: any }) => { [key: string]: any };
}

const animations = {
    fade: () => ({
        atEnter: { opacity: 0 },
        atLeave: { opacity: 0 },
        atActive: { opacity: 1 }
    }),

    dropHorizontal: (offset: number = 20) => ({
        atEnter: { offsetX: offset, opacity: 0 },
        atLeave: { offsetX: -offset, opacity: 0 },
        atActive: { offsetX: 0, opacity: 1 },
        mapStyles: (styles: any) => ({
            transform: `translateX(${styles.offsetX}px)`,
            opacity: styles.opacity
        })
    }),

    dropVertical: (offset: number = 20) => ({
        atEnter: { offsetY: -offset, opacity: 0 },
        atLeave: { offsetY: offset, opacity: 0 },
        atActive: { offsetY: 0, opacity: 1 },
        mapStyles: (styles: any) => ({
            transform: `translateY(${styles.offsetY}px)`,
            opacity: styles.opacity
        })
    })
};

export interface IAnimatedSwitchProps {
    animation: IAnimation;
    className?: string;
}

export const AnimatedSwitch: React.SFC<IAnimatedSwitchProps> & { animations?: typeof animations } = (props) => (
    <NativeAnimatedSwitch className={props.className || 'switch-wrapper'} {...props.animation}>
        {props.children}
    </NativeAnimatedSwitch>
);

AnimatedSwitch.animations = animations;