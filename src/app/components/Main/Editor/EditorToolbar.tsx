/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { TEditorTab } from 'apla/editor';

import Toolbar, { Filler } from '../Toolbar';
import ToolButton from 'components/Main/Toolbar/ToolButton';
import SegmentButton from 'components/Button/SegmentButton';
import DropdownButton from 'components/Button/DropdownButton';
import Heading from 'components/Dropdown/Heading';
import Item from 'components/Dropdown/Item';
import Info from 'components/Dropdown/Info';

interface Props {
    currentTab: TEditorTab;
    canSave: boolean;
    canRevert: boolean;
    onRevert: () => void;
    onToolChange: (tool: string) => void;
    onExec: () => void;
    onSave: () => void;
}

const editorTools = [
    {
        type: 'constructor',
        content: (
            <FormattedMessage id="editor.tool.designer" defaultMessage="Designer" />
        )
    },
    {
        type: 'editor',
        content: (
            <FormattedMessage id="editor.tool.developer" defaultMessage="Developer" />
        )
    },
    {
        type: 'preview',
        content: (
            <FormattedMessage id="editor.tool.preview" defaultMessage="Preview" />
        )
    }
];

const resolveToolIndex = (tool: string) => {
    return editorTools.findIndex(l => l.type === tool);
};

const EditorToolbar: React.SFC<Props> = props => {
    const onToolChange = (toolIndex: number) => {
        const toolDef = editorTools[toolIndex];
        if (toolDef) {
            props.onToolChange(toolDef.type);
        }
    };

    return (
        <Toolbar>
            <DropdownButton
                content={
                    <div>
                        <Heading>First group</Heading>
                        <Item icon="icon-action-undo">First item</Item>
                        <Item icon="icon-note">Second item</Item>
                        <Item disabled>Third item</Item>
                        <Heading>Second group</Heading>
                        <Info>Nothing to see here. Move along</Info>
                    </div>
                }
            >
                Hello?
            </DropdownButton>
            <ToolButton icon="icon-note" disabled={!props.canSave} onClick={props.onSave}>
                <FormattedMessage id="editor.save" defaultMessage="Save" />
            </ToolButton>
            <ToolButton icon="icon-action-undo" disabled={!props.canRevert} onClick={props.onRevert}>
                <FormattedMessage id="editor.revert" defaultMessage="Revert" />
            </ToolButton>
            {props.currentTab && 'contract' === props.currentTab.type && (
                <ToolButton icon="icon-paper-plane" disabled={props.currentTab.new || props.canSave} onClick={props.onExec}>
                    <FormattedMessage id="editor.execute" defaultMessage="Execute" />
                </ToolButton>
            )}
            <Filler />
            {props.currentTab && 'contract' !== props.currentTab.type && (
                <SegmentButton
                    activeIndex={resolveToolIndex(props.currentTab.tool)}
                    onChange={onToolChange}
                    items={editorTools.map(l => l.content)}
                />
            )}
        </Toolbar>
    );
};

export default EditorToolbar;