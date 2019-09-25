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
import ContentEditable from 'react-contenteditable';
import TagWrapper from '../components/TagWrapper';
import { OnPasteStripFormatting } from 'lib/constructor/helpers';
import { IConstructorElementProps } from 'apla/editor';
import { TProtypoElement } from 'apla/protypo';

export interface IEditableBlockProps extends IConstructorElementProps {
    'className'?: string;
    'class'?: string;
    'childrenText'?: string;
    'tail'?: TProtypoElement[];

    'src'?: string;
    'alt'?: string;
    'for'?: string;
    'name'?: string;
    'disabled'?: string;
    'placeholder'?: string;
    'type'?: string;
    'icon'?: string;
    'title'?: string;
    'text'?: string;
}

interface IEditableBlockState {
    condition: boolean;
}

export default class EditableBlock extends React.Component<IEditableBlockProps, IEditableBlockState> {
    protected logic = false;
    protected editableTag = 'div';
    protected editableDisplay = 'block';
    protected renderTag = 'div';
    protected editable = true;
    protected canMove = true;

    private _text = '';

    constructor(props: IEditableBlockProps) {
        super(props);
        this._text = props.childrenText;
    }

    notEmpty(childrenText: string) {
        return childrenText !== undefined && childrenText !== null && childrenText.length >= 0;
    }
    hasTag(text: string) {
        return text.indexOf('<') === -1;
    }
    classChanged(nextProps: IEditableBlockProps): boolean {
        return this.props.class !== nextProps.class;
    }
    tailChanged(nextProps: IEditableBlockProps): boolean {
        return this.props.tail !== nextProps.tail;
    }
    conditionChanged(nextState: IEditableBlockState): boolean {
        return this.state && nextState && this.state.condition !== nextState.condition;
    }
    elementSelectedAndNotEmptyChildrenText(nextProps: IEditableBlockProps): boolean {
        return this.props.selected && this.notEmpty(this.props.childrenText)
            && nextProps.selected && this.notEmpty(nextProps.childrenText);
    }
    getClasses() {
        return classnames({
            [this.props.class]: true,
            [this.props.className]: true,
            'b-selected': this.props.selected
        });
    }
    shouldComponentUpdate(nextProps: IEditableBlockProps, nextState: IEditableBlockState) {
        if (!nextProps.selected) {
            return true;
        }

        if (this.elementSelectedAndNotEmptyChildrenText(nextProps)) {
            if (this.hasTag(nextProps.childrenText)) {
                return true;
            }
            return (
                this.classChanged(nextProps)
                || this.tailChanged(nextProps)
                || this.conditionChanged(nextState)
            );
        }

        return true;
    }

    onPaste(e: any) {
        OnPasteStripFormatting(this, e);
    }

    onClick(e: any) {
        e.stopPropagation();
        this.props.selectTag(this.props.tag);
    }

    handleChange(e: any) {
        this._text = e.target.value;
    }

    handleBlur() {
        this.props.changePage({ text: this._text, tagID: this.props.tag.id });
    }

    removeTag() {
        this.props.removeTag({ tag: this.props.tag });
    }

    hasChildrenText() {
        return this.props.selected && this.props.childrenText !== undefined && this.props.childrenText !== null && this.props.childrenText.length >= 0;
    }
    contentEditable(tagName: string, classes: string) {
        return (
            <ContentEditable
                tagName={tagName}
                className={classes}
                html={this.props.childrenText}
                onChange={this.handleChange.bind(this)}
                onBlur={this.handleBlur.bind(this)}
            />
        );
    }
    renderChildrenWrapper() {
        const classes = this.getClasses();
        return (
            (this.hasChildrenText() && this.editable) ? (
                this.contentEditable(this.editableTag, classes)
            ) : (
                    this.renderChildren(classes)
                )
        );
    }
    renderChildren(classes: string) {
        const Tag = `${this.renderTag}`;
        return (
            <Tag
                className={classes}
            >
                {this.props.children}
            </Tag>
        );
    }
    render() {
        if (this.logic && !this.props.logic) {
            return null;
        }
        const { connectDropTarget, connectDragSource, connectDragPreview, isOver } = this.props;
        const style = {
            display: (this.editableDisplay === 'inline') ? 'inline-block' : ''
        };

        return connectDragPreview(connectDropTarget(
            // Only native element nodes can now be passed to React DnD connectors.You can either wrap TagWrapper into a <div>, or turn it into a drag source or a drop target itself.
            <span style={style}>
                <TagWrapper
                    display={this.editableDisplay}
                    selected={this.props.selected}
                    canDrop={isOver}
                    canDropPosition={this.props.canDropPosition}
                    onClick={this.onClick.bind(this)}
                    removeTag={this.removeTag.bind(this)}
                    connectDragSource={connectDragSource}
                    canMove={this.canMove}
                >
                    {this.renderChildrenWrapper()}
                </TagWrapper>
            </span>
        ));
    }
}