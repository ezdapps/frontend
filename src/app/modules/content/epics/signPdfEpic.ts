/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Epic } from 'modules';
import { Observable } from 'rxjs/Observable';
import { signPdf } from 'modules/content/actions';
import { modalShow } from 'modules/modal/actions';
import queryString from 'query-string';

const signPdfEpic: Epic = action$ =>
    action$.ofAction(signPdf).flatMap(action => {
        const { redirect, ...relayParams } = action.payload;
        const returnUrl = action.payload.redirect
            ? new URL(window.location.href).origin + action.payload.redirect
            : window.location.href;

        return Observable.from(
            fetch(
                'https://lt-relay.saurer.now.sh/api/relayPDF.js?' +
                    queryString.stringify({
                        ...relayParams,
                        returnUrl
                    })
            )
        )
            .flatMap(result => result.json())
            .map(data =>
                modalShow({
                    id: 'SIGN_PDF',
                    type: 'SIGN_PDF',
                    params: {
                        SAMLRequest: data.SAMLRequest,
                        RelayState: data.RelayState,
                        redirect: action.payload.redirect
                    }
                })
            )
            .catch(e => Observable.empty<never>());
    });

export default signPdfEpic;
