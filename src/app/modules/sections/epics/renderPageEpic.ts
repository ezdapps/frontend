/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Action } from 'redux';
import { Epic } from 'modules';
import { Observable } from 'rxjs/Observable';
import { renderPage, menuPush } from '../actions';
import { STATIC_PAGES } from 'lib/staticPages';

const renderPageEpic: Epic = (action$, store, { api }) => action$.ofAction(renderPage.started)
    .switchMap(action => {
        const state = store.getState();
        const client = api({
            apiHost: state.auth.session.network.apiHost,
            sessionToken: state.auth.session.sessionToken
        });

        const staticPage = STATIC_PAGES[action.payload.name];
        if (staticPage && (staticPage.section === null || staticPage.section === action.payload.section)) {
            return Observable.of(renderPage.done({
                params: action.payload,
                result: {
                    tree: [],
                    static: true
                }
            }));
        }

        return Observable.from(client.content({
            type: 'page',
            name: action.payload.name,
            params: action.payload.params,
            locale: state.storage.locale

        })).flatMap(content => Observable.of<Action>(
            renderPage.done({
                params: action.payload,
                result: {
                    tree: content.tree,
                    static: false
                }
            }),
            menuPush({
                section: action.payload.section,
                menu: {
                    name: content.menu,
                    content: content.menutree
                }
            })
        )).catch(e => Observable.of(renderPage.failed({
            params: action.payload,
            error: e.error
        })));
    });

export default renderPageEpic;