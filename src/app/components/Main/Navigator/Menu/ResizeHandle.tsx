/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';

import themed from 'components/Theme/themed';

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
`;

const ResizeHandle: React.SFC<Props> = props => (
    <StyledResizeHandle onClick={props.onFoldToggle}>
        <div />
    </StyledResizeHandle>
);

export default ResizeHandle;