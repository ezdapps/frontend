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

import * as actions from './actions';
import { OrderedMap } from 'immutable';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { ITransactionCollection } from 'apla/tx';
import txExecDoneHandler from './reducers/txExecDoneHandler';
import txExecHandler from './reducers/txExecHandler';
import txExecFailedHandler from './reducers/txExecFailedHandler';

export type State = {
    readonly transactions: OrderedMap<string, ITransactionCollection>;
};

export const initialState: State = {
    transactions: OrderedMap()
};

export default reducerWithInitialState(initialState)
    .case(actions.txExec.started, txExecHandler)
    .case(actions.txExec.done, txExecDoneHandler)
    .case(actions.txExec.failed, txExecFailedHandler);