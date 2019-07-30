/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import { TEditorTab } from 'apla/editor';

import CodeEditor from './CodeEditor';
import EditorTabs from './EditorTabs';
import ConstructorTabbed from 'containers/Editor/ConstructorTabbed';
import Page from 'components/Navigator/Page';

export interface IEditorProps {
    mainSection: string;
    tabIndex: number;
    tabs: TEditorTab[];
    onTabChange: (index: number) => void;
    onTabUpdate: (value: string) => void;
    onTabClose: (index: number) => void;
    onTabCloseAll: () => void;
    onTabCloseSaved: () => void;
}

class Editor extends React.Component<IEditorProps> {
    renderTool(tab: TEditorTab) {
        switch (tab.tool) {
            case 'constructor':
                return (
                    <ConstructorTabbed section={this.props.mainSection} pageID={tab.id} pageName={tab.name} />
                );

            case 'preview':
                return (
                    <div className="flex-col flex-stretch scroll">
                        <Page
                            section={this.props.mainSection}
                            value={{
                                name: 'preview',
                                status: 'LOADED',
                                content: tab.preview,
                                static: false,
                                params: {},
                                location: {
                                    key: 'preview',
                                    pathname: 'preview',
                                    search: '',
                                    state: '',
                                    hash: ''
                                }
                            }}
                        />
                    </div>
                );

            default:
                return null;
        }
    }

    render() {
        return (
            <div className="fullscreen noscroll">
                <EditorTabs
                    tabIndex={this.props.tabIndex}
                    tabs={this.props.tabs}
                    onChange={this.props.onTabChange}
                    onClose={this.props.onTabClose}
                    onCloseAll={this.props.onTabCloseAll}
                    onCloseSaved={this.props.onTabCloseSaved}
                />
                {this.props.tabs.map((tab, index) => (
                    <div key={index} className="fullscreen" style={{ display: this.props.tabIndex === index ? null : 'none' }}>
                        <div className="fullscreen" style={{ display: 'editor' === tab.tool ? null : 'none' }}>
                            <CodeEditor
                                language={'contract' === tab.type ? 'simvolio' : 'protypo'}
                                value={tab.value}
                                onChange={this.props.onTabUpdate}
                            />
                        </div>
                        {index === this.props.tabIndex && 'editor' !== tab.tool ? this.renderTool(tab) : null}
                    </div>
                ))}
            </div>
        );
    }
}

export default Editor;