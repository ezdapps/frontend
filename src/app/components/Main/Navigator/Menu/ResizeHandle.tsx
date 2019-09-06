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

interface Props {
    onFoldToggle: () => void;
}

const styles = {
    // Active hover zone at each size
    hoverWidth: 11,

    // Visible border width
    borderSize: 2
};

const StyledResizeHandle = themed.button`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    text-align: center;
    width: ${styles.hoverWidth * 2}px;
    outline: 0;
    border: 0;
    background: none;
    padding: 0;
    margin: 0;
    margin-left: ${-styles.hoverWidth}px;
    z-index: 105;

    &.disabled {
        cursor: default;
    }
    
    > div {
        position: absolute;
        top: 0;
        bottom: 0;
        left: ${styles.hoverWidth - styles.borderSize / 2}px;
        margin: 0;
        width: ${styles.borderSize}px;
        transition: background .16s;
    }

    &:hover > div {
        background: ${props => props.theme.menuBorder};
    }

    @media (${media.md}) {
        display: none;
    }
`;

const ResizeHandle: React.SFC<Props> = props => (
    <StyledResizeHandle onClick={props.onFoldToggle}>
        <div />
    </StyledResizeHandle>
);

export default ResizeHandle;