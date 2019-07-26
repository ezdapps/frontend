/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { State } from '../reducer';
import { renderPage } from '../actions';
import { Reducer } from 'modules';

const renderPageFailedHandler: Reducer<typeof renderPage.failed, State> = (state, payload): State => ({
    ...state,
    sections: {
        ...state.sections,
        [payload.params.section]: {
            ...state.sections[payload.params.section],
            page: {
                name: payload.params.name,
                status: 'ERROR',
                content: [],
                static: false,
                params: payload.params.params,
                error: payload.error,
                location: payload.params.location,
            }
        }
    }
});

export default renderPageFailedHandler;