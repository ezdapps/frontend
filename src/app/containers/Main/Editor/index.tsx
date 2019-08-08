/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { changeEditorTab, closeEditorTab, closeSavedEditorTab, updateEditorTab, loadEditorTab, createEditorTab } from 'modules/editor/actions';

import Editor from 'components/Main/Editor';
import { modalShow } from 'modules/modal/actions';

const mapStateToProps = (state: IRootState) => ({
    mainSection: state.sections.mainSection,
    tabIndex: state.editor.tabIndex,
    tabs: state.editor.tabs,
});

const mapDispatchToProps = {
    onTabCreate: createEditorTab.started,
    onTabLoad: loadEditorTab.started,
    onTabChange: (index: number) => changeEditorTab(index),
    onTabClose: (index: number) => closeEditorTab(index),
    onTabCloseAll: () => modalShow({
        id: 'EDITOR_CLOSE_ALL',
        type: 'EDITOR_CLOSE_ALL',
        params: {}
    }),
    onTabCloseSaved: () => closeSavedEditorTab(),
    onTabUpdate: updateEditorTab,
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);