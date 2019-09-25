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

import { Epic } from 'modules';
import { Observable } from 'rxjs/Observable';
import { renderPage } from '../actions';
import { STATIC_PAGES } from 'lib/staticPages';
import { modalShow } from 'modules/modal/actions';
import { Action } from 'redux';

const renderPageEpic: Epic = (action$, store, { api }) => action$.ofAction(renderPage.started)
    .switchMap(action => {
        const state = store.getState();
        const client = api({
            apiHost: state.auth.session.network.apiHost,
            sessionToken: state.auth.session.sessionToken
        });

        const staticPage = STATIC_PAGES[action.payload.name];
        const substitute = staticPage && staticPage.renderSubstitute && staticPage.renderSubstitute(action.payload.params);
        const requestPage = staticPage ? substitute : {
            name: action.payload.name,
            params: action.payload.params
        };

        return Observable.if(
            () => !!(requestPage && requestPage.name),
            Observable.defer(() =>
                Observable.from(client.content({
                    type: 'page',
                    locale: state.storage.locale,
                    ...requestPage

                }))
            ),
            Observable.of({
                tree: [],
                menu: '',
                menutree: []
            })

        ).flatMap(content => {
            return Observable.concat<Action>(
                Observable.of(renderPage.done({
                    params: action.payload,
                    result: {
                        tree: content.tree,
                        menu: content.menu,
                        menuTree: content ? content.menutree : [],
                        static: !!staticPage
                    }
                })),
                Observable.if(
                    () => !!action.payload.popup,
                    Observable.defer(() => Observable.of(modalShow({
                        id: 'PAGE_MODAL' + action.payload.name,
                        type: 'PAGE_MODAL',
                        params: {
                            name: action.payload.name,
                            section: action.payload.section,
                            title: action.payload.popup.title || action.payload.name,
                            width: action.payload.popup.width,
                            tree: content.tree,
                            params: action.payload.params,
                            static: !!staticPage
                        }
                    })))
                ),
            );

        }).catch(e => Observable.of(renderPage.failed({
            params: action.payload,
            error: e.error
        })));
    });

export default renderPageEpic;