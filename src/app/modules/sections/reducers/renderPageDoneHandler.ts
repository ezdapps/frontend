/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { State } from '../reducer';
import { renderPage } from '../actions';
import { Reducer } from 'modules';

const renderPageDoneHandler: Reducer<typeof renderPage.done, State> = (state, payload): State => ({
    ...state,
    sections: {
        ...state.sections,
        [payload.params.section]: {
            ...state.sections[payload.params.section],
            page: {
                name: payload.params.name,
                status: 'LOADED',
                content: payload.result.tree,
                static: payload.result.static,
                params: payload.params.params,
                error: undefined,
                location: payload.params.location,
            }
        }
    }
});

export default renderPageDoneHandler;