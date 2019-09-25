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
import styled from 'styled-components';
import classNames from 'classnames';
import ScrollBar from 'react-custom-scrollbars';

const Nop: React.SFC = () => <span />;

export interface IScrollViewProps {
    className?: string;
    disableHorizontal?: boolean;
    disableVertical?: boolean;
    hideHorizontal?: boolean;
    hideVertical?: boolean;
    horizontalWheel?: boolean;
}

const StyledScrollBar = styled(ScrollBar)`
    &.disable-vertical > div {
        overflow-y: hidden !important;
        margin-right: 0 !important;
    }
    
    &.disable-horizontal > div {
        overflow-x: hidden !important;
        margin-bottom: 0 !important;
    }
`;

class ScrollView extends React.Component<IScrollViewProps> {
    private _scrollBar: ScrollBar;

    onMouseWheel: React.EventHandler<React.WheelEvent<ScrollBar>> = e => {
        if (!e.deltaX) {
            e.preventDefault();
            const currentScrollDelta = this._scrollBar.getScrollLeft();
            this._scrollBar.scrollLeft(currentScrollDelta + (e.deltaY * 8));
        }
    }

    calcValue = (...args: boolean[]) => {
        if (args.find(l => l === true)) {
            return Nop;
        }
        else {
            return undefined;
        }
    }

    render() {
        const classes = classNames(this.props.className, {
            'disable-vertical': this.props.disableVertical,
            'disable-horizontal': this.props.disableHorizontal
        });

        return (
            <StyledScrollBar
                innerRef={l => this._scrollBar = l}
                className={classes}
                onWheel={this.props.horizontalWheel && this.onMouseWheel}
                renderTrackHorizontal={this.calcValue(this.props.disableHorizontal, this.props.hideHorizontal)}
                renderThumbHorizontal={this.calcValue(this.props.disableHorizontal, this.props.hideHorizontal)}
                renderTrackVertical={this.calcValue(this.props.disableVertical, this.props.hideVertical)}
                renderThumbVertical={this.calcValue(this.props.disableVertical, this.props.hideVertical)}
            >
                {this.props.children}
            </StyledScrollBar>
        );
    }
}

export default ScrollView;