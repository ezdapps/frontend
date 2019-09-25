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

import { IRootState } from 'modules';
import { connect } from 'react-redux';
import { editorSave, revertEditorTab, changeEditorTool, debugContract, createEditorTab } from 'modules/editor/actions';

import EditorToolbar from 'components/Main/Editor/EditorToolbar';

const mapStateToProps = (state: IRootState) => {
    const currentTab = state.editor.tabs[state.editor.tabIndex];

    return {
        currentTab,
        canSave: !state.editor.pending &&
            currentTab && currentTab.dirty,
        canRevert: !state.editor.pending &&
            currentTab && (currentTab.dirty && null !== currentTab.initialValue)
    };
};

const mapDispatchToProps = {
    debugContract,
    revertEditorTab,
    editorSave,
    createEditorTab: createEditorTab.started,
    changeEditorTool: changeEditorTool.started
};

export default connect(mapStateToProps, mapDispatchToProps, (state, dispatch: any) => ({
    ...state,
    onExec: () => { dispatch.debugContract(state.currentTab.name); },
    onRevert: () => { dispatch.revertEditorTab(state.currentTab.uuid); },
    onToolChange: (tool: string) => { dispatch.changeEditorTool(tool); },
    onSave: () => { dispatch.editorSave(state.currentTab); },
    onCreateTab: (type: string) => { dispatch.createEditorTab(type); }

}))(EditorToolbar);