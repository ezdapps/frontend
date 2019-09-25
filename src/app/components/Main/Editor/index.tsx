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
import { TEditorTab } from 'apla/editor';

import CodeEditor from 'components/Editor/CodeEditor';
import EditorTabs from './EditorTabs';
import EditorTool from './EditorTool';
import EditorToolbar from 'containers/Toolbar/EditorToolbar';
import LocalizedDocumentTitle from 'components/DocumentTitle/LocalizedDocumentTitle';

interface Props {
    mainSection: string;
    tabIndex: number;
    tabs: TEditorTab[];
    onTabChange?: (uuid: string) => void;
    onTabUpdate?: (value: string) => void;
    onTabClose?: (uuid: string) => void;
    onTabCloseAll?: () => void;
    onTabCloseSaved?: () => void;
}

const Editor: React.SFC<Props> = props => (
    <LocalizedDocumentTitle title="editor">
        <div className="fullscreen noscroll">
            <EditorToolbar />
            <EditorTabs
                tabIndex={props.tabIndex}
                tabs={props.tabs}
                onChange={props.onTabChange}
                onClose={props.onTabClose}
                onCloseAll={props.onTabCloseAll}
                onCloseSaved={props.onTabCloseSaved}
            />
            {props.tabs.map((tab, index) => (
                <div key={index} className="fullscreen" style={{ display: props.tabIndex === index ? null : 'none' }}>
                    <div className="fullscreen" style={{ display: 'editor' === tab.tool ? null : 'none' }}>
                        <CodeEditor
                            language={'contract' === tab.type ? 'simvolio' : 'protypo'}
                            value={tab.value}
                            onChange={props.onTabUpdate}
                        />
                    </div>
                    {index === props.tabIndex && 'editor' !== tab.tool ? (
                        <EditorTool mainSection={props.mainSection} value={tab} />
                    ) : null}
                </div>
            ))}
        </div>
    </LocalizedDocumentTitle>
);

export default Editor;