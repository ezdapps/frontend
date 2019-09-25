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

import { Action } from 'redux';
import { Epic } from 'redux-observable';
import { Observable } from 'rxjs';
import { IRootState } from 'modules';
import { generatePageTemplate, updateEditorTab, setPageTemplate } from '../actions';

const generatePageTemplateEpic: Epic<Action, IRootState> =
    (action$, store, { constructorModule }) => action$.ofAction(generatePageTemplate)
        .flatMap(action => {
            const state = store.getState().editor;
            const tab = state.tabs[state.tabIndex].designer;
            const jsonData = tab && tab.data && tab.data.jsonData;
            const codeGenerator = new constructorModule.CodeGenerator(jsonData);
            const pageTemplate = codeGenerator.render();

            return Observable.concat([
                updateEditorTab(pageTemplate),
                setPageTemplate(pageTemplate),
            ]);
        });

export default generatePageTemplateEpic;