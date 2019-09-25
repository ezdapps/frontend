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

import * as actions from './actions';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { ISection } from 'apla/content';
import updateSectionHandler from './reducers/updateSectionHandler';
import sectionsInitHandler from './reducers/sectionsInitHandler';
import menuPopHandler from './reducers/menuPopHandler';
import menuPushHandler from './reducers/menuPushHandler';
import renderPageDoneHandler from './reducers/renderPageDoneHandler';
import renderPageFailedHandler from './reducers/renderPageFailedHandler';
import renderPageHandler from './reducers/renderPageHandler';

export type State = {
    readonly mainSection: string;
    readonly sections: {
        readonly [name: string]: ISection;
    };
};

export const initialState: State = {
    mainSection: 'home',
    sections: {}
};

export default reducerWithInitialState(initialState)
    .case(actions.updateSection, updateSectionHandler)
    .case(actions.menuPop, menuPopHandler)
    .case(actions.menuPush, menuPushHandler)
    .case(actions.renderPage.done, renderPageDoneHandler)
    .case(actions.renderPage.failed, renderPageFailedHandler)
    .case(actions.renderPage.started, renderPageHandler)
    .case(actions.sectionsInit, sectionsInitHandler);