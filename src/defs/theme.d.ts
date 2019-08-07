/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

declare module 'apla/theme' {
    interface IThemeDefinition {
        windowBorder: string;

        headerBackground: string;
        headerForeground: string;
        headerBackgroundActive: string;
        headerForegroundMuted: string;
        headerHeight: number;

        menubarSize: number;
        menubarBackground: string;
        menubarBackgroundActive: string;
        menubarBackgroundFocused: string;
        menubarBackgroundSecondary: string;
        menubarForeground: string;
        menubarForegroundActive: string;
        menubarHighlight: string;
        menubarFocus: string;

        toolbarBackground: string;
        toolbarBackgroundActive: string;
        toolbarBackgroundFocused: string;
        toolbarForegroundActive: string;
        toolbarForegroundPrimary: string;
        toolbarForeground: string;
        toolbarHeight: number;
        toolbarSpacerForeground: string;

        progressBarForeground: string;

        menuHeight: number;
        menuBackground: string;
        menuForeground: string;
        menuBackgroundActive: string;
        menuOutline: string;
        menuIconColor: string;
        menuPrimaryForeground: string;
        menuPrimaryActive: string;

        contentForeground: string;
        contentBackground: string;

        editorBackground: string;

        modalHeaderBackground: string;
        modalHeaderForeground: string;
        modalOutline: string;

        notificationBackground: string;
        notificationForeground: string;
        notificationIconColor: string;
        notificationPrimaryForeground: string;

        sectionButtonOutline: string;
        sectionButtonBackground: string;
        sectionButtonForeground: string;
        sectionButtonActive: string;
        sectionButtonPrimary: string;

        dropdownMenuBackground: string;
        dropdownMenuForeground: string;
        dropdownMenuDisabled: string;
        dropdownMenuActive: string;
        dropdownMenuSeparator: string;
        dropdownMenuPrimary: string;
        dropdownMenuSecondary: string;

        securityWarningBackground: string;
        securityWarningForeground: string;

        uiBorderLight: string;
    }
}