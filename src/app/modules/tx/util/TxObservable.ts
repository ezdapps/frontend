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

import { Action as ReduxAction } from 'redux';
import { Observable } from 'rxjs';
import { ActionsObservable } from 'redux-observable';
import { txCall, txExec } from '../actions';
import { ITransactionCall, ITxError, ITransaction } from 'apla/tx';
import { isType } from 'typescript-fsa';

type TTxDoneAction =
    ReturnType<typeof txExec.done> |
    ReturnType<typeof txExec.failed>;

const TxObservable = (action$: ActionsObservable<ReduxAction>, params: { tx: ITransactionCall, success?: (tx: ITransaction[]) => Observable<ReduxAction>, failure?: (error: ITxError) => Observable<ReduxAction> }) =>
    Observable.merge(
        action$.filter(l => isType(l, txExec.done) || isType(l, txExec.failed))
            .filter((l: TTxDoneAction) => {
                return params.tx.uuid === l.payload.params.uuid;
            })
            .take(1)
            .flatMap(result => {
                if (isType(result, txExec.done)) {
                    return params.success ? params.success(result.payload.result) : Observable.empty<never>();
                }
                else if (isType(result, txExec.failed)) {
                    return params.failure ? params.failure(result.payload.error) : Observable.empty<never>();
                }
                else {
                    return Observable.empty<never>();
                }
            }),
        Observable.of(txCall(params.tx))
    );

export default TxObservable;