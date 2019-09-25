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

import actionCreatorFactory from 'typescript-fsa';
import { IMenu, ISection } from 'apla/content';
import { TProtypoElement } from 'apla/protypo';
import { Location } from 'history';

const actionCreator = actionCreatorFactory('sections');

export const updateSection = actionCreator<ISection>('UPDATE_SECTION');
export const menuPop = actionCreator<string>('MENU_POP');
export const menuPush = actionCreator<{ section: string, menu: IMenu }>('MENU_PUSH');
export const renderPage = actionCreator.async<{ section: string, name: string, popup?: { title?: string, width?: number }, params: { [key: string]: string }, location: Location }, { tree: TProtypoElement[], menu: string, menuTree: TProtypoElement[], static: boolean }, string>('RENDER_PAGE');
export const reloadPage = actionCreator<{ section: string }>('RELOAD_PAGE');
export const sectionsInit = actionCreator<{ mainSection: string, sections: { [name: string]: ISection } }>('SECTIONS_INIT');
