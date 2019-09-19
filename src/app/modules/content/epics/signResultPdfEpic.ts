/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Epic } from 'modules';
import { Observable } from 'rxjs/Observable';
import { signResultPdf } from 'modules/content/actions';
import { modalShow } from 'modules/modal/actions';
import queryString from 'query-string';

const signResultPdfEpic: Epic = action$ =>
    action$.ofAction(signResultPdf).flatMap(action => {
        const { qa, ...relayParams } = action.payload;
        const qaValues = qa.map(l => l.q + ':' + l.a).join(';');

        return Observable.from(
            fetch(
                'https://lt-relay.saurer.now.sh/api/relayResultPDF.js?' +
                    queryString.stringify({ ...relayParams, qa: qaValues })
            )
        )
            .flatMap(result => result.json())
            .map(data =>
                modalShow({
                    id: 'SIGN_PDF',
                    type: 'SIGN_PDF',
                    params: {
                        SAMLRequest: data.SAMLRequest,
                        RelayState: data.RelayState
                    }
                })
            )
            .catch(e => Observable.empty<never>());
    });

export default signResultPdfEpic;
