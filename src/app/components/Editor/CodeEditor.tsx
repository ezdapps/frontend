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
import MonacoEditor from 'react-monaco-editor';
import registerProtypo from './protypo';
import registerSimvolio from './simvolio';

import { editor } from 'monaco-editor';
import 'monaco-editor/esm/vs/editor/browser/controller/coreCommands.js';
import 'monaco-editor/esm/vs/editor/contrib/bracketMatching/bracketMatching.js';
import 'monaco-editor/esm/vs/editor/contrib/caretOperations/caretOperations.js';
import 'monaco-editor/esm/vs/editor/contrib/caretOperations/transpose.js';
import 'monaco-editor/esm/vs/editor/contrib/clipboard/clipboard.js';
import 'monaco-editor/esm/vs/editor/contrib/find/findController.js';
import 'monaco-editor/esm/vs/editor/contrib/multicursor/multicursor.js';
import 'monaco-editor/esm/vs/editor/contrib/suggest/suggestController.js';
import 'monaco-editor/esm/vs/editor/contrib/suggest/suggest.js';
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';

registerProtypo(monacoEditor);
registerSimvolio(monacoEditor);

const StyledCodeEditor = styled.div`
    &.editor-flex {
        display: flex;
        flex-direction: column;
        flex: 1;

        > .react-monaco-editor-container {
            flex: 1;
        }
    }
`;

interface Props {
    language?: string;
    value?: string;
    width?: number;
    height?: number;
    options?: editor.IEditorOptions;
    onChange?: (code: string) => void;
}

const CodeEditor: React.SFC<Props> = props => (
    <StyledCodeEditor className={props.height ? null : 'editor-flex'}>
        <MonacoEditor
            language={props.language}
            value={props.value}
            onChange={props.onChange}
            options={{
                automaticLayout: true,
                contextmenu: false,
                scrollBeyondLastLine: false,
                ...props.options
            }}
            height={props.height}
        />
    </StyledCodeEditor>
);

export default CodeEditor;