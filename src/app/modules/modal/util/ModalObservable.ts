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
import { Observable } from 'rxjs';
import { ActionsObservable } from 'redux-observable';
import { modalShow, modalClose } from '../actions';
import { IModalCall, TModalResultReason } from 'apla/modal';

const ModalObservable = <T>(action$: ActionsObservable<Action>, params: { modal: IModalCall, success?: (data: T) => Observable<Action>, failure?: (reason: TModalResultReason) => Observable<Action> }) =>
    Observable.merge(
        action$.ofAction(modalClose)
            .take(1)
            .flatMap(result => {
                if ('RESULT' === result.payload.reason) {
                    return params.success ? params.success(result.payload.data) : Observable.empty<never>();
                }
                else {
                    return params.failure ? params.failure(result.payload.reason) : Observable.empty<never>();
                }
            }),
        Observable.of(modalShow(params.modal))
    );

export default ModalObservable;