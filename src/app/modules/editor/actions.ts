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

import actionCreatorFactory from 'typescript-fsa';
import { TProtypoElement } from 'apla/protypo';

import {
    IEditorTabCreateCall, ILoadEditorTabCall, IReloadEditorTabCall, TEditorTab, IChangePageCall, IChangePageResult, ISaveConstructorHistoryResult,
    IConstructorUndoRedoResult, ISetTagCanDropPositionCall, ISetTagCanDropPositionResult, IAddTagCall, IOperateTagCall, IOperateTagResult, IMoveTreeTag, ISelectTagResult,
    IGetPageTreeResult
} from 'apla/editor';

const actionCreator = actionCreatorFactory('editor');

export const editorSave = actionCreator<TEditorTab>('EDITOR_SAVE');
export const createEditorTab = actionCreator.async<string, IEditorTabCreateCall>('CREATE_EDITOR_TAB');
export const loadEditorTab = actionCreator.async<ILoadEditorTabCall, TEditorTab>('LOAD_EDITOR_TAB');
export const changeEditorTab = actionCreator<string>('CHANGE_EDITOR_TAB');
export const closeEditorTab = actionCreator<string>('CLOSE_EDITOR_TAB');
export const closeAllEditorTabs = actionCreator('CLOSE_ALL_EDITOR_TABS');
export const closeSavedEditorTab = actionCreator('CLOSE_SAVED_EDITOR_TAB');
export const destroyEditorTab = actionCreator<string>('DESTROY_EDITOR_TAB');
export const updateEditorTab = actionCreator<string>('UPDATE_EDITOR_TAB');
export const revertEditorTab = actionCreator<string>('REVERT_EDITOR_TAB');
export const resetEditorTab = actionCreator<string>('RESET_EDITOR_TAB');
export const reloadEditorTab = actionCreator<IReloadEditorTabCall>('RELOAD_EDITOR_TAB');
export const changeEditorTool = actionCreator.async<string, TProtypoElement[]>('CHANGE_EDITOR_TOOL');
export const setPageTemplate = actionCreator<string>('SET_PAGE_TEMPLATE');
export const getPageTree = actionCreator.async<void, IGetPageTreeResult, string>('GET_PAGE_TREE');
export const changePage = actionCreator.async<IChangePageCall, IChangePageResult>('CHANGE_PAGE');
export const selectTag = actionCreator.async<TProtypoElement, ISelectTagResult>('SELECT_TAG');
export const setTagCanDropPosition = actionCreator.async<ISetTagCanDropPositionCall, ISetTagCanDropPositionResult>('SET_TAG_CAN_DROP_POSITION');
export const addTag = actionCreator.async<IAddTagCall, IOperateTagResult>('ADD_TAG');
export const copyTag = actionCreator.async<IOperateTagCall, IOperateTagResult>('COPY_TAG');
export const moveTag = actionCreator.async<IOperateTagCall, IOperateTagResult>('MOVE_TAG');
export const removeTag = actionCreator.async<IOperateTagCall, IOperateTagResult>('REMOVE_TAG');
export const moveTreeTag = actionCreator<IMoveTreeTag>('MOVE_TREE_TAG');
export const saveConstructorHistory = actionCreator.async<void, ISaveConstructorHistoryResult>('SAVE_CONSTRUCTOR_HISTORY');
export const constructorUndo = actionCreator.async<void, IConstructorUndoRedoResult>('CONSTRUCTOR_UNDO');
export const constructorRedo = actionCreator.async<void, IConstructorUndoRedoResult>('CONSTRUCTOR_REDO');
export const generatePageTemplate = actionCreator<string>('GENERATE_PAGE_TEMPLATE');
export const debugContract = actionCreator<string>('DEBUG_CONTRACT');