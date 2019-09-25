/* This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA. */

declare module 'apla/protypo' {
    import { TBreadcrumbType } from 'apla/content';

    type TProtypoElement = {
        readonly tag: string;
        readonly id?: string;
        readonly text?: string;
        readonly attr?: { [key: string]: any };
        readonly sysAttr?: { [key: string]: string };
        readonly children?: TProtypoElement[] | null;
        readonly childrenText?: string | null;
        readonly tail?: TProtypoElement[] | null;
    };

    interface ISource {
        readonly columns: string[];
        readonly types: string[];
        readonly data: string[][];
    }

    type TChartType = 'bar' | 'line' | 'pie';

    interface IButtonConfirm {
        type?: string;
        title?: string;
        text?: string;
        confirmButton?: string;
        cancelButton?: string;
    }

    interface IButtonPopup {
        title?: string;
        width?: number;
    }

    interface IButtonPage {
        name: string;
        section: string;
        params: {
            [key: string]: any;
        };
    }

    interface IErrorRedirect {
        pagename: string;
        pageparams?: {
            [key: string]: any;
        };
    }

    interface IAction {
        name: string;
        params?: {
            [key: string]: string;
        };
    }

    interface IButtonInteraction {
        uuid: string;
        silent?: boolean;
        from: {
            name: string;
            section: string;
            type: TBreadcrumbType;
        };
        confirm?: IButtonConfirm;
        contracts: {
            name: string;
            params: {
                [key: string]: any
            }[]
        }[];
        page?: IButtonPage;
        popup?: IButtonPopup;
        errorRedirects?: {
            [key: string]: IErrorRedirect
        },
        actions: IAction[];
    }
}