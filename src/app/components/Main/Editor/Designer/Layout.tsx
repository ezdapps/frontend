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
import * as classnames from 'classnames';
import { DropTarget } from 'react-dnd';

const layoutTarget = {
    drop(props: ILayoutProps, monitor: any) {
        if (monitor.didDrop()) {
            return;
        }
        const droppedItem = monitor.getItem();

        if (droppedItem.new) {
            props.addTag({
                tag: droppedItem
            });
        }
        else {
            switch (droppedItem.dropEffect) {
                case 'move':
                    props.moveTag({
                        tag: droppedItem.tag
                    });
                    break;
                case 'copy':
                    props.copyTag({
                        tag: droppedItem.tag
                    });
                    break;
                default:
                    break;
            }

        }
    }
};

function collect(connect?: any, monitor?: any) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver({ shallow: true })
    };
}

const ItemTypes = {
    SOURCE: 'element'
};

interface ILayoutProps {
    grid: boolean;
    connectDropTarget?: any;
    isOver?: boolean;
    addTag?: any;
    moveTag?: any;
    copyTag?: any;
}

interface ILayoutState {
}

class Layout extends React.Component<ILayoutProps, ILayoutState> {
    constructor(props: ILayoutProps) {
        super(props);
    }
    render() {
        const { connectDropTarget, isOver } = this.props;

        const classes = classnames({
            'b-constructor-layout': true,
            'b-constructor-layout_grid': this.props.grid,
            'b-constructor-layout_can-drop': isOver
        });

        return connectDropTarget(
            <div className={classes}>
                {this.props.children}
            </div>
        );
    }
}

export default DropTarget(ItemTypes.SOURCE, layoutTarget, collect)(Layout);