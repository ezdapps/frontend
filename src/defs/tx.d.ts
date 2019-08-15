/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

declare module 'apla/tx' {
    import { Int64BE } from 'int64-buffer';

    type TTxError =
        'error' |
        'info' |
        'warning' |
        'panic' |
        'E_GUEST_VIOLATION' |
        'E_CONTRACT' |
        'E_SERVER';

    interface ITxResult {
        block: string;
        result: string;
    }

    interface IErrorRedirect {
        pagename: string;
        pageparams?: {
            [key: string]: any;
        };
    }

    interface ITxError {
        errorRedirects?: IErrorRedirect;
        id?: string;
        type: TTxError;
        error: string;
        params?: any[];
    }

    interface ITxStatus extends ITxResult, ITxError { }

    interface ITransactionParam {
        type: string;
        value: object;
    }

    type TTransactionStatus =
        'pending' | 'done' | 'error';

    interface ITransactionCollection {
        status: TTransactionStatus;
        error?: ITxError;
        stack: ITransaction[];
    }

    interface ITransaction {
        name: string,
        hash: string,
        status: ITxStatus;
        body: ITransactionBody;
    }

    interface ITransactionCall {
        uuid: string;
        silent?: boolean;
        section?: string;
        contracts: {
            name: string;
            params: {
                [key: string]: any;
            }[];
        }[];
        errorRedirects?: {
            [key: string]: IErrorRedirect;
        }
    }

    interface ITransactionBody {
        Header: {
            ID: number;
            Time: number;
            EcosystemID: number;
            KeyID: Int64BE;
            NetworkID: number;
            PublicKey: ArrayBuffer;
        };
        Params: {
            [key: string]: object;
        };
    }
}
