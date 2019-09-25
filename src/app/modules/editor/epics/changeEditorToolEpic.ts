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
import { Epic } from 'modules';
import { changeEditorTool, getPageTree } from '../actions';
import { Observable } from 'rxjs/Observable';

const changeEditorToolEpic: Epic = (action$, store, { api }) => action$.ofAction(changeEditorTool.started)
    .flatMap(action => {
        const state = store.getState();
        const client = api({
            apiHost: state.auth.session.network.apiHost,
            sessionToken: state.auth.session.sessionToken
        });

        switch (action.payload) {
            case 'preview':
                const payload = state.editor.tabs[state.editor.tabIndex].value;
                return Observable.fromPromise(client.contentTest({
                    template: payload,
                    locale: state.storage.locale,
                    params: {}

                })).map(result => changeEditorTool.done({
                    params: action.payload,
                    result: result.tree

                })).catch(e => Observable.of(changeEditorTool.failed({
                    params: action.payload,
                    error: e
                })));

            case 'constructor':
                return Observable.of<Action>(
                    getPageTree.started(null),
                    changeEditorTool.done({
                        params: action.payload,
                        result: null
                    }));

            default:
                return Observable.of(changeEditorTool.done({
                    params: action.payload,
                    result: null
                }));
        }
    });

export default changeEditorToolEpic;