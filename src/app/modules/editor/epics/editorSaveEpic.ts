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

import * as actions from '../actions';
import uuid from 'uuid';
import { Action } from 'redux';
import { Epic } from 'redux-observable';
import { IRootState } from 'modules';
import { txCall } from 'modules/tx/actions';

const connections = {
    contract: '@1EditContract',
    page: '@1EditPage',
    menu: '@1EditMenu',
    block: '@1EditBlock',
};

const editorSaveEpic: Epic<Action, IRootState> = (action$, store) => action$.ofAction(actions.editorSave)
    .filter(l => !l.payload.new && connections[l.payload.type])
    .map(action =>
        txCall({
            uuid: uuid.v4(),
            contracts: [{
                name: connections[action.payload.type],
                params: [{
                    Id: action.payload.id,
                    Value: action.payload.value
                }]
            }]
        })
    );

export default editorSaveEpic;