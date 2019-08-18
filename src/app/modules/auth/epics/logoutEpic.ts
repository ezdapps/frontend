/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Action } from 'redux';
import { Epic } from 'modules';
import { logout, deauthorize } from '../actions';
import { Observable } from 'rxjs/Observable';
import { closeAllEditorTabs } from 'modules/editor/actions';
import { isType } from 'typescript-fsa';
import { discoverNetwork } from 'modules/engine/actions';

const logoutEpic: Epic = (action$, store) => action$
    .filter(action => isType(action, logout.started) || isType(action, discoverNetwork.done))
    .flatMap(action =>
        Observable.of<Action>(
            deauthorize(null),
            closeAllEditorTabs(),
            logout.done({
                params: null,
                result: null
            })
        )
    );

export default logoutEpic;