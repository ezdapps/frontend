/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { ISection } from 'apla/content';

const findMenu = (section: ISection, name: string) =>
    section.menus.findIndex(m => m.name === name);

export default findMenu;