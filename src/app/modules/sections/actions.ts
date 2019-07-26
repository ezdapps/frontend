/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import actionCreatorFactory from 'typescript-fsa';
import { IMenu, IPage, ISection } from 'apla/content';
import { TProtypoElement } from 'apla/protypo';
import { Location } from 'history';

const actionCreator = actionCreatorFactory('sections');

export const updateSection = actionCreator<ISection>('UPDATE_SECTION');
export const menuPop = actionCreator('MENU_POP');
export const menuPush = actionCreator<{ section: string, menu: IMenu }>('MENU_PUSH');
export const renderPage = actionCreator.async<{ section: string, name: string, params: { [key: string]: string }, location: Location }, { tree: TProtypoElement[], static: boolean }, string>('RENDER_PAGE');
export const reloadPage = actionCreator.async<{}, { params: { [key: string]: any }, menu: IMenu, page: IPage }, string>('RELOAD_PAGE');
export const sectionsInit = actionCreator<{ mainSection: string, sections: { [name: string]: ISection } }>('SECTIONS_INIT');