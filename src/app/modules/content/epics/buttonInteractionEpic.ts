/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Action } from 'redux';
import { Epic } from 'modules';
import { Observable } from 'rxjs/Observable';
import { buttonInteraction } from 'modules/content/actions';
import { isType } from 'typescript-fsa';
import { txCall, txExec } from 'modules/tx/actions';
import { modalShow, modalClose, modalPage } from 'modules/modal/actions';
import { push } from 'connected-react-router';

const buttonInteractionEpic: Epic = (action$, store, { routerService }) => action$.ofAction(buttonInteraction)
    // Show confirmation window if there is any
    .flatMap(rootAction => {
        return Observable.if(
            () => !!rootAction.payload.confirm,
            Observable.merge(
                Observable.of(modalShow({
                    id: rootAction.payload.uuid,
                    type: 'TX_CONFIRM',
                    params: rootAction.payload.confirm
                })),
                action$.ofAction(modalClose).take(1).flatMap(modalPayload => Observable.if(
                    () => 'RESULT' === modalPayload.payload.reason,
                    Observable.of(rootAction),
                    Observable.empty<never>()
                ))
            ),
            Observable.of(rootAction)

        ).flatMap(action => {
            if (isType(action, buttonInteraction) && action.payload.contracts.length) {
                if (store.getState().auth.isDefaultWallet) {
                    return Observable.of(modalShow({
                        id: 'TX_ERROR',
                        type: 'TX_ERROR',
                        params: {
                            type: 'E_GUEST_VIOLATION'
                        }
                    }));
                }

                return Observable.merge(
                    Observable.of(txCall({
                        uuid: action.payload.uuid,
                        silent: action.payload.silent,
                        contracts: action.payload.contracts,
                        errorRedirects: action.payload.errorRedirects
                    })),
                    action$.filter(l =>
                        isType(l, txExec.done) || isType(l, txExec.failed)

                    ).filter((l: ReturnType<typeof txExec.done> | ReturnType<typeof txExec.failed>) =>
                        action.payload.uuid === l.payload.params.uuid

                    ).take(1).flatMap(result => {
                        if (isType(result, txExec.done)) {
                            return Observable.of({
                                ...action,
                                meta: {
                                    ...action.meta,
                                    txHashes: result.payload.result.map(l => l.hash)
                                }
                            });
                        }
                        else {
                            return Observable.empty<never>();
                        }
                    })
                );
            }
            else {
                return Observable.of(action);
            }

        }).flatMap(action => {
            if (isType(action, buttonInteraction)) {
                if (action.payload.page) {
                    const params = action.payload.page.params;
                    if ('txinfo' === action.payload.page.name) {
                        params.txhashes = (action.meta.txHashes || []).join(',');
                    }

                    if (action.payload.popup) {
                        return Observable.of(modalPage({
                            name: action.payload.page.name,
                            section: action.payload.page.section,
                            params,
                            title: action.payload.popup.title,
                            width: action.payload.popup.width
                        }));
                    }
                    else {
                        const redirectUrl = routerService.generateRoute(`/browse/${action.payload.page.section}/${action.payload.page.name}`, action.payload.page.params);
                        return Observable.of<Action>(
                            push(redirectUrl, { from: action.payload.from })
                        );
                    }
                }
                else {
                    return Observable.empty<never>();
                }
            }
            else {
                return Observable.of(action);
            }
        });
    });

export default buttonInteractionEpic;