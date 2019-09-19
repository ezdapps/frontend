/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Action } from 'redux';
import { Epic } from 'modules';
import { Observable } from 'rxjs/Observable';
import { buttonInteraction, signPdf, signResultPdf } from 'modules/content/actions';
import { isType } from 'typescript-fsa';
import { txCall, txExec } from 'modules/tx/actions';
import { modalShow, modalClose } from 'modules/modal/actions';
import { push } from 'connected-react-router';
import { renderPage } from 'modules/sections/actions';
import { createEditorTab, loadEditorTab } from 'modules/editor/actions';

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
                        section: action.payload.from.section,
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
            if (isType(action, buttonInteraction) && action.payload.page) {
                const params = action.payload.page.params;
                if ('txinfo' === action.payload.page.name) {
                    params.txhashes = ((action.meta || {}).txHashes || []).join(',');
                }

                const date = new Date();
                const dd = date.getDate();
                const mm = ('0' + (1 + date.getMonth())).slice(-2);
                const yyyy = date.getFullYear();
                if ('SIGN_PDF' === action.payload.page.name) {
                    return Observable.of(signPdf({
                        name: action.payload.page.params.Name,
                        company: action.payload.page.params.Company,
                        address: action.payload.page.params.Address,
                        address2: action.payload.page.params.Address2,
                        proxy: action.payload.page.params.Proxy,
                        location: action.payload.page.params.Location,
                        date: `${dd}/${mm}/${yyyy}`,
                        signature: action.payload.page.params.Signature,
                        meetingID: action.payload.page.params.MeetingID,
                        account: store.getState().auth.wallet.wallet.address,
                        redirect: action.payload.page.params.Page && routerService.generateRoute(`/browse/${action.payload.page.section}/${action.payload.page.params.Page}`)
                    }));
                }
                else if ('SIGN_RESULT_PDF' === action.payload.page.name) {
                    const qa: { index: number, q: string, a: string}[] = [];
                    for (let itr in action.payload.page.params) {
                        if (action.payload.page.params.hasOwnProperty(itr)) {
                            const matches = /Question([0-9]+)/.exec(itr);    
                            if (matches) {
                                const [q, a] = action.payload.page.params.split(':');
                                qa.push({
                                    index: Number(matches[1]),
                                    q: (q || '').trim(),
                                    a: (a || '').trim()
                                });
                            }
                        }
                    }

                    return Observable.of(signResultPdf({
                        name: action.payload.page.params.Name,
                        company: action.payload.page.params.Company,
                        address: action.payload.page.params.Address,
                        address2: action.payload.page.params.Address2,
                        date: `${dd}/${mm}/${yyyy}`,
                        qa: qa.sort((a, b) => a.index - b.index),
                        location: action.payload.page.params.Location,
                        signature: action.payload.page.params.Signature,
                        meetingID: action.payload.page.params.MeetingID,
                        account: store.getState().auth.wallet.wallet.address
                    }));
                }

                if (action.payload.popup) {
                    return Observable.of(renderPage.started({
                        location: null,
                        section: action.payload.page.section,
                        name: action.payload.page.name,
                        params: action.payload.page.params,
                        popup: action.payload.popup
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
                return Observable.of(action);
            }

        }).flatMap(action => {
            if (isType(action, buttonInteraction)) {
                return Observable.from(action.payload.actions).flatMap(buttonAction => {
                    switch (buttonAction.name) {
                        case 'CREATE': return Observable.of(createEditorTab.started(buttonAction.params.Type));
                        case 'EDIT': return Observable.of(loadEditorTab.started({ type: buttonAction.params.Type, name: buttonAction.params.Name }));
                        case 'SIGN_PDF': return Observable.of(signPdf({
                            name: buttonAction.params.Name,
                            company: buttonAction.params.Company,
                            address: buttonAction.params.Address,
                            address2: buttonAction.params.Address2,
                            proxy: buttonAction.params.Proxy,
                            location: buttonAction.params.Location,
                            date: buttonAction.params.Date,
                            signature: buttonAction.params.Signature,
                            meetingID: action.payload.page.params.MeetingID,
                            account: store.getState().auth.wallet.wallet.address,
                            redirect: buttonAction.params.Page && routerService.generateRoute(`/browse/${action.payload.page.section}/${buttonAction.params.Page}`)
                        }));
                        default: return Observable.empty<never>();
                    }
                });
            }
            else {
                return Observable.of(action);
            }
        });
    });

export default buttonInteractionEpic;