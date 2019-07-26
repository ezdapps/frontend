/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Epic } from 'modules';
import { locationChange } from '../actions';
import { renderPage } from 'modules/sections/actions';
import { Observable } from 'rxjs';

const sectionLoadEpic: Epic = (action$, store, { routerService }) => action$.ofAction(locationChange)
    // .delayWhen(() => action$.filter(() => store.getState().auth.isAcquired))
    .flatMap(action => {
        const match = routerService.matchRoute('(/)(:section)(/)(:page)(/)', action.payload.location.pathname + action.payload.location.search);
        const state = store.getState();

        if (state.auth.isAuthenticated && match) {
            const section = state.sections.sections[match.parts.section || state.sections.mainSection];
            const pageName = match.parts.page || section.defaultPage;

            // TODO: refactoring
            // must ignore navigation when page and params are equal
            // if ('POP' === action.payload.action) {
            //     const pageIndex = findPage(section, pageName);
            //     if (-1 !== pageIndex) {
            //         const page = store.value.navigator.sections[section.name].pages[pageIndex];
            //         if (page.content || page.error) {
            //             return of(popPage({
            //                 location: action.payload.location,
            //                 section: section.name,
            //                 name: pageName
            //             }));
            //         }
            //     }
            // }

            return Observable.of(renderPage.started({
                location: {
                    state: {},
                    ...action.payload.location
                },
                section: section.name,
                name: pageName,
                params: match.query
            }));
        }
        else {
            return Observable.empty();
        }

    });

export default sectionLoadEpic;