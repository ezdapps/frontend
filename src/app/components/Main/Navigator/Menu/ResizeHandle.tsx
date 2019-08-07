/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import classNames from 'classnames';

import themed from 'components/Theme/themed';

interface IResizeHandleProps {
    width: number;
    resizing: boolean;
    setResizing?: (resizing: boolean) => void;
    navigationResize?: (width: number) => void;
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
    right: 0;
    text-align: center;
    width: ${styles.hoverWidth * 2}px;
    outline: 0;
    border: 0;
    background: none;
    padding: 0;
    margin: 0;
    margin-right: ${-styles.hoverWidth}px;
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

    &:hover > div, &.active > div {
        background: ${props => props.theme.menuBorder};
    }
`;

class ResizeHandle extends React.Component<IResizeHandleProps> {
    private _mouseUpListenerBind: (e: MouseEvent) => void;
    private _mouseMoveListenerBind: (e: MouseEvent) => void;

    componentDidMount() {
        this._mouseMoveListenerBind = this.onMouseMove.bind(this);
        this._mouseUpListenerBind = this.onMouseUp.bind(this);
        document.body.addEventListener('mousemove', this._mouseMoveListenerBind);
        document.body.addEventListener('mouseup', this._mouseUpListenerBind);
    }

    componentWillUnmount() {
        document.body.removeEventListener('mousemove', this._mouseMoveListenerBind);
    }

    onMouseMove(e: MouseEvent) {
        if (this.props.resizing && e.clientX !== this.props.width) {
            // this.props.navigationResize(e.clientX);
        }
    }

    onMouseDown(e: React.MouseEvent<HTMLButtonElement>) {
        if (!this.props.resizing && 0 === e.button) {
            this.props.setResizing(true);
        }
    }

    onMouseUp(e: MouseEvent) {
        if (this.props.resizing && 0 === e.button) {
            this.props.setResizing(false);
        }
    }

    render() {
        const classes = classNames({
            active: this.props.resizing
        });

        return (
            <StyledResizeHandle onMouseDown={e => this.onMouseDown(e)} className={classes}>
                <div />
            </StyledResizeHandle>
        );
    }
}

export default ResizeHandle;