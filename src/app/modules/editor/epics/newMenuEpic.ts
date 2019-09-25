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

import * as uuid from 'uuid';
import { Observable } from 'rxjs';
import { Epic } from 'modules';
import { editorSave, reloadEditorTab } from '../actions';
import ModalObservable from 'modules/modal/util/ModalObservable';
import TxObservable from 'modules/tx/util/TxObservable';

const newMenuEpic: Epic = (action$, store, { api }) => action$.ofAction(editorSave)
    .filter(l => l.payload.new && 'menu' === l.payload.type)
    .flatMap(action => {
        const id = uuid.v4();
        const state = store.getState();
        const client = api({
            apiHost: state.auth.session.network.apiHost,
            sessionToken: state.auth.session.sessionToken
        });

        return Observable.from(client.getData({
            name: 'applications',
            columns: ['id', 'deleted', 'name']

        })).flatMap(apps => ModalObservable<{ name: string, app: string, conditions: string }>(action$, {
            modal: {
                id,
                type: 'CREATE_INTERFACE',
                params: {
                    type: 'menu',
                    apps: apps.list.filter(l => '0' === l.deleted)
                }
            },
            success: result => TxObservable(action$, {
                tx: {
                    uuid: id,
                    contracts: [{
                        name: '@1NewMenu',
                        params: [{
                            Name: result.name,
                            Value: action.payload.value,
                            Conditions: result.conditions,
                            ApplicationId: result.app || 0
                        }]
                    }]
                },
                success: tx => Observable.fromPromise(client.getMenu({
                    name: result.name

                })).map(response => reloadEditorTab({
                    type: action.payload.type,
                    id: action.payload.id,
                    data: {
                        new: false,
                        id: String(response.id),
                        name: response.name,
                        initialValue: response.value
                    }
                }))
            })
        }));
    });

export default newMenuEpic;