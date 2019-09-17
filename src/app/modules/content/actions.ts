/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import actionCreatorFactory from 'typescript-fsa';
import { TProtypoElement, IButtonInteraction } from 'apla/protypo';

const actionCreator = actionCreatorFactory('content');

// Navigation
export const ecosystemInit = actionCreator<{ stylesheet: string, printStylesheet: string }>('ECOSYSTEM_INIT');
export const setMenuActive = actionCreator<boolean>('SET_MENU_ACTIVE');

// Interaction
export const buttonInteraction = actionCreator<IButtonInteraction>('BUTTON_INTERACTION');
export const displayData = actionCreator.async<string, string, string>('DISPLAY_DATA');
export const signPdf = actionCreator<{
    name: string;
    account: string;
    meetingID: string;
    company: string;
    address: string;
    address2: string;
    proxy: string;
    location: string;
    date: string;
    signature: string;
    redirect?: string;
}>('SIGN_PDF');

// Notifications
export const fetchNotifications = actionCreator.async<void, TProtypoElement[], void>('FETCH_NOTIFICATIONS');

export const reloadStylesheet = actionCreator<string>('RELOAD_STYLESHEET');