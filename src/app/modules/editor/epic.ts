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

import { combineEpics } from 'redux-observable';
import newContractEpic from './epics/newContractEpic';
import editorSaveEpic from './epics/editorSaveEpic';
import newPageEpic from './epics/newPageEpic';
import editEntityEpic from './epics/editEntityEpic';
import newMenuEpic from './epics/newMenuEpic';
import newBlockEpic from './epics/newBlockEpic';
import closeEditorTabEpic from './epics/closeEditorTabEpic';
import createEditorTabEpic from './epics/createEditorTabEpic';
import changeEditorToolEpic from './epics/changeEditorToolEpic';
import loadEditorTabEpic from './epics/loadEditorTabEpic';
import generatePageTemplateEpic from './epics/generatePageTemplateEpic';
import getPageTreeEpic from './epics/getPageTreeEpic';
import getPageTreeDoneEpic from './epics/getPageTreeDoneEpic';
import changePageEpic from './epics/changePageEpic';
import selectTagEpic from './epics/selectTagEpic';
import addTagEpic from './epics/addTagEpic';
import moveTagEpic from './epics/moveTagEpic';
import copyTagEpic from './epics/copyTagEpic';
import removeTagEpic from './epics/removeTagEpic';
import moveTreeTagEpic from './epics/moveTreeTagEpic';
import saveConstructorHistoryEpic from './epics/saveConstructorHistoryEpic';
import constructorUndoEpic from './epics/constructorUndoEpic';
import constructorRedoEpic from './epics/constructorRedoEpic';
import setTagCanDropPositionEpic from './epics/setTagCanDropPositionEpic';
import debugContractEpic from './epics/debugContractEpic';
import revertEditorTabEpic from './epics/revertEditorTabEpic';
import openEditorEpic from './epics/openEditorEpic';

export default combineEpics(
    changeEditorToolEpic,
    closeEditorTabEpic,
    createEditorTabEpic,
    editEntityEpic,
    editorSaveEpic,
    loadEditorTabEpic,
    newBlockEpic,
    newContractEpic,
    newMenuEpic,
    newPageEpic,
    generatePageTemplateEpic,
    getPageTreeEpic,
    getPageTreeDoneEpic,
    changePageEpic,
    selectTagEpic,
    addTagEpic,
    moveTagEpic,
    copyTagEpic,
    removeTagEpic,
    moveTreeTagEpic,
    saveConstructorHistoryEpic,
    constructorUndoEpic,
    constructorRedoEpic,
    setTagCanDropPositionEpic,
    debugContractEpic,
    revertEditorTabEpic,
    openEditorEpic
);