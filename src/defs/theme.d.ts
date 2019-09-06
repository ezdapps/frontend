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

declare module 'apla/theme' {
    interface IThemeDefinition {
        windowBorder: string;

        headerBackground: string;
        headerForeground: string;
        headerHeight: number;

        menubarBackground: string;
        menubarBackgroundActive: string;
        menubarBackgroundFocused: string;
        menubarBackgroundSecondary: string;
        menubarForeground: string;
        menubarForegroundActive: string;

        toolbarBackground: string;
        toolbarBackgroundActive: string;
        toolbarBackgroundFocused: string;
        toolbarForegroundActive: string;
        toolbarForegroundPrimary: string;
        toolbarForegroundDisabled: string;
        toolbarForeground: string;
        toolbarSpacerForeground: string;

        menuBackground: string;
        menuForeground: string;
        menuBackgroundActive: string;
        menuBorder: string;
        menuOutline: string;
        menuIconColor: string;
        menuPrimaryForeground: string;
        menuPrimaryActive: string;
        menuSize: number;
        menuSizeFolded: number;

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