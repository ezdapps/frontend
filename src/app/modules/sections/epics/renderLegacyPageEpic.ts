/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Epic } from 'modules';
import { Observable } from 'rxjs/Observable';
import { renderLegacyPage } from '../actions';
import { LEGACY_PAGES } from 'lib/legacyPages';
import { IContentResponse } from 'apla/api';

const renderLegacyPageEpic: Epic = (action$, store, { api }) => action$.ofAction(renderLegacyPage.started)
    .flatMap(action => {
        const state = store.getState();
        const client = api({
            apiHost: state.auth.session.network.apiHost,
            sessionToken: state.auth.session.sessionToken
        });

        const LEGACY_PAGE = LEGACY_PAGES[action.payload.name];
        const substitute = LEGACY_PAGE.renderSubstitute && LEGACY_PAGE.renderSubstitute(action.payload.params);

        return Observable.zip(
            Observable.if(
                () => !!action.payload.menu,
                Observable.defer(() => client.content({
                    type: 'menu',
                    name: action.payload.menu,
                    params: {},
                    locale: state.storage.locale
                })),
                Observable.of<IContentResponse>(null)
            ),
            Observable.if(
                () => !!substitute,
                Observable.defer(() => client.content({
                    type: 'page',
                    name: substitute.name,
                    params: substitute.params,
                    locale: state.storage.locale
                })),
                Observable.of<IContentResponse>(null)
            )

        ).map(([menu, page]) => renderLegacyPage.done({
            params: action.payload,
            result: {
                menu: {
                    name: action.payload.menu,
                    content: menu ? menu.tree : []
                },
                page: page ?
                    {
                        name: substitute.name,
                        params: substitute.params,
                        content: page.tree
                    } :
                    {
                        name: '',
                        params: {},
                        content: []
                    }
            }

        })).catch(e => Observable.of(renderLegacyPage.done({
            params: action.payload,
            result: {
                menu: null,
                page: {
                    name: '',
                    params: {},
                    content: []
                }
            }
        })));
    });

export default renderLegacyPageEpic;