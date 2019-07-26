/*---------------------------------------------------------------------------------------------
*  Copyright (c) EGAAS S.A. All rights reserved.
*  See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

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

    interface IButtonInteraction {
        uuid: string;
        silent?: boolean;
        from?: {
            name: string;
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
        }
    }
}