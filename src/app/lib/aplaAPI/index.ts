// MIT License
// 
// Copyright (c) 2016-2018 AplaProject
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import queryString from 'query-string';
import urlJoin from 'url-join';
import urlTemplate from 'url-template';
import { IUIDResponse, ILoginRequest, ILoginResponse, IRefreshResponse, IRowRequest, IRowResponse, IPageResponse, IBlockResponse, IMenuResponse, IContentRequest, IContentResponse, IContentTestRequest, IContentJsonRequest, IContentJsonResponse, ITableResponse, ISegmentRequest, ITablesResponse, IDataRequest, IDataResponse, IHistoryRequest, IHistoryResponse, INotificationsRequest, IParamResponse, IParamsRequest, IParamsResponse, IRefreshRequest, IParamRequest, ITemplateRequest, IContractRequest, IContractResponse, IContractsResponse, ITxCallRequest, ITxCallResponse, ITxPrepareRequest, ITxPrepareResponse, ITxStatusRequest, ITxStatusResponse, ITableRequest, TConfigRequest, ISystemParamsRequest, ISystemParamsResponse, ITxPrepareBatchRequest, ITxStatusBatchRequest, ITxPrepareBatchResponse, ITxCallBatchRequest, ITxCallBatchResponse, ITxStatusBatchResponse } from 'apla/api';

export type TRequestMethod =
    'get' |
    'post';

export interface IRequest {
    method: TRequestMethod;
    url: string;
    headers?: {
        [key: string]: string;
    };
    body?: FormData;
}

export interface IRequestOptions<P, R> {
    headers?: {
        [key: string]: string;
    };
    requestTransformer?: (request: P) => { [key: string]: any };
    responseTransformer?: (response: any) => R;
}

export interface IEndpointFactory {
    <R>(method: TRequestMethod, endpoint: string, options?: IRequestOptions<never, R>): IParameterLessEndpoint<R>;
    <P, R>(method: TRequestMethod, endpoint: string, options?: IRequestOptions<P, R>): IEndpoint<P, R>;
}

export interface IEndpoint<P, R> {
    (params: P): Promise<R>;
}

export interface IParameterLessEndpoint<R> {
    (): Promise<R>;
}

export interface IRequestTransport {
    (request: IRequest): Promise<{ body: any }>;
}

export interface IRequestParams {
    [key: string]: any;
}

export interface ISecuredRequestParams extends IRequestParams {
    session: string;
}

export interface IAPIOptions {
    apiHost: string;
    apiEndpoint: string;
    transport: IRequestTransport;
    session?: string;
    requestOptions?: IRequestOptions<any, any>;
}

class AplaAPI {
    private _defaultOptions: IRequestOptions<any, any> = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };
    private _options: IAPIOptions;

    constructor(options: IAPIOptions) {
        this._options = {
            ...options
        };

        if (options.requestOptions) {
            this._defaultOptions = options.requestOptions;
        }
    }

    protected serializeFormData(values: { [key: string]: any }) {
        const formData = new FormData();
        for (let itr in values) {
            if (values.hasOwnProperty(itr) && values[itr]) {
                formData.append(itr, values[itr]);
            }
        }
        return formData;
    }

    protected request = async <P, R>(method: TRequestMethod, endpoint: string, requestParams: P, options: IRequestOptions<P, R> = {}) => {
        const requestEndpoint = urlTemplate.parse(endpoint).expand(requestParams);
        const requestUrl = urlJoin(this._options.apiHost, this._options.apiEndpoint, requestEndpoint);
        const params = requestParams && options.requestTransformer ? options.requestTransformer(requestParams) : requestParams;

        // TODO: Set request timeout
        const requestOptions: IRequestOptions<P, R> = {
            ...this._defaultOptions,
            ...options
        };

        let json: any = null;

        const formData = new FormData();
        for (let itr in params) {
            if (params.hasOwnProperty(itr) && params[itr]) {
                formData.append(itr, params[itr]);
            }
        }

        const query = 'get' === method ? queryString.stringify(params) : '';
        const body = 'get' === method ? null : this.serializeFormData(params);

        try {
            const response = await this._options.transport({
                method,
                url: requestUrl + (query ? '?' + query : ''),
                body,
                headers: requestOptions.headers
            });
            json = response.body;
        }
        catch (e) {
            // TODO: Not possible to catch with any other way
            if (!e) {
                json = { error: 'E_OFFLINE' };
            }
            else if (e && e.message && ('Failed to fetch' === e.message || -1 !== e.message.indexOf('ECONNREFUSED'))) {
                json = { error: 'E_OFFLINE' };
            }
            else {
                json = { error: e };
            }
        }

        if (json && json.error) {
            throw json;
        }
        else {
            return requestOptions.responseTransformer ? requestOptions.responseTransformer(json) : json;
        }
    }

    protected setEndpoint: IEndpointFactory = <P extends IRequestParams, R>(method: TRequestMethod, endpoint: string, options: IRequestOptions<P, R> = {}) => {
        return async (requestParams?: P) => {
            return this.request(method, endpoint, requestParams, options);
        };
    }

    protected setSecuredEndpoint: IEndpointFactory = <P extends IRequestParams, R>(method: TRequestMethod, endpoint: string, options: IRequestOptions<P, R> = {}) => {
        return async (requestParams?: P) => {
            return this.request(method, endpoint, requestParams, {
                ...options,
                headers: {
                    ...options.headers,
                    Authorization: `Bearer ${this._options.session}`
                }
            });
        };
    }

    public to(apiHost: string) {
        return new AplaAPI({
            ...this._options,
            apiHost
        });
    }

    public authorize(session: string) {
        return new AplaAPI({
            ...this._options,
            session
        });
    }

    // Authorization
    public getUid = this.setEndpoint<IUIDResponse>('get', 'getuid', {
        responseTransformer: response => ({
            token: response.token,
            uid: 'LOGIN' + response.uid
        })
    });
    public login = this.setSecuredEndpoint<ILoginRequest, ILoginResponse>('post', 'login', {
        requestTransformer: request => ({
            pubkey: request.publicKey.slice(2),
            signature: request.signature,
            ecosystem: request.ecosystem,
            role_id: request.role,
            expire: request.expire,
        }),
        responseTransformer: response => ({
            ...response,
            roles: response.roles || []
        })
    });
    public refresh = this.setSecuredEndpoint<IRefreshRequest, IRefreshResponse>('post', 'refresh');
    public requestNotifications = this.setSecuredEndpoint<INotificationsRequest[], void>('post', 'updnotificator', {
        requestTransformer: request => ({
            ids: JSON.stringify(request)
        })
    });

    // Data getters
    public getSystemParams = this.setSecuredEndpoint<ISystemParamsRequest, ISystemParamsResponse>('get', 'systemparams', {
        requestTransformer: request => ({
            names: (request.names || []).join(',')
        })
    });
    public getEcosystemName = this.setEndpoint<{ id: string | number }, string>('get', 'ecosystemname', {
        responseTransformer: response => response.ecosystem_name
    });
    public getConfig = this.setEndpoint<{ name: TConfigRequest }, string>('get', 'config/{name}', { requestTransformer: request => null });
    public getContract = this.setSecuredEndpoint<IContractRequest, IContractResponse>('get', 'contract/{name}', { requestTransformer: request => null });
    public getContracts = this.setSecuredEndpoint<ISegmentRequest, IContractsResponse>('get', 'contracts');
    public getParam = this.setSecuredEndpoint<IParamRequest, IParamResponse>('get', 'ecosystemparam/{name}', { requestTransformer: request => null });
    public getParams = this.setSecuredEndpoint<IParamsRequest, IParamsResponse>('get', 'ecosystemparams', {
        requestTransformer: request => ({
            names: (request.names || []).join(',')
        })
    });
    public getPage = this.setSecuredEndpoint<ITemplateRequest, IPageResponse>('get', 'interface/page/{name}', { requestTransformer: request => null });
    public getBlock = this.setSecuredEndpoint<ITemplateRequest, IBlockResponse>('get', 'interface/block/{name}', { requestTransformer: request => null });
    public getMenu = this.setSecuredEndpoint<ITemplateRequest, IMenuResponse>('get', 'interface/menu/{name}', { requestTransformer: request => null });
    public getTable = this.setSecuredEndpoint<ITableRequest, ITableResponse>('get', 'table/{name}', { requestTransformer: request => null });
    public getTables = this.setSecuredEndpoint<ISegmentRequest, ITablesResponse>('get', 'tables');
    public getHistory = this.setSecuredEndpoint<IHistoryRequest, IHistoryResponse>('get', 'history/{table}/{id}', { requestTransformer: () => null });
    public getRow = this.setSecuredEndpoint<IRowRequest, IRowResponse>('get', 'row/{table}/{id}', {
        requestTransformer: request => ({
            columns: (request.columns || []).join(',')
        })
    });
    public getData = this.setSecuredEndpoint<IDataRequest, IDataResponse>('get', 'list/{name}', {
        requestTransformer: request => ({
            columns: (request.columns || []).join(',')
        })
    });

    // Template engine
    public content = this.setSecuredEndpoint<IContentRequest, IContentResponse>('post', 'content/{type}/{name}', {
        requestTransformer: request => ({
            ...request.params,
            lang: request.locale
        })
    });
    public contentTest = this.setSecuredEndpoint<IContentTestRequest, IContentResponse>('post', 'content', {
        requestTransformer: request => ({
            ...request.params,
            template: request.template,
            lang: request.locale
        })
    });

    public contentJson = this.setSecuredEndpoint<IContentJsonRequest, IContentJsonResponse>('post', 'content', {
        requestTransformer: request => ({
            template: request.template,
            lang: request.locale,
            source: request.source,
        })
    });

    // Transactions
    public txCall = this.setSecuredEndpoint<ITxCallRequest, ITxCallResponse>('post', 'contract/{requestID}', {
        requestTransformer: request => ({
            time: request.time,
            signature: request.signature,
            pubkey: request.pubkey
        })
    });
    public txPrepare = this.setSecuredEndpoint<ITxPrepareRequest, ITxPrepareResponse>('post', 'prepare/{name}', {
        requestTransformer: request => request.params
    });
    public txStatus = this.setSecuredEndpoint<ITxStatusRequest, ITxStatusResponse>('get', 'txstatus/{hash}', { requestTransformer: () => null });

    // Transactions batch-processing
    public txPrepareBatch = this.setSecuredEndpoint<ITxPrepareBatchRequest, ITxPrepareBatchResponse>('post', 'prepareMultiple', {
        requestTransformer: request => ({
            data: JSON.stringify({
                contracts: request.contracts.map(l => ({
                    contract: l.name,
                    params: l.params
                }))
            })
        })
    });
    public txCallBatch = this.setSecuredEndpoint<ITxCallBatchRequest, ITxCallBatchResponse>('post', 'contractMultiple/{requestID}', {
        requestTransformer: request => ({
            data: JSON.stringify({
                signatures: request.signatures,
                pubkey: request.pubkey,
                time: request.time
            })
        })
    });
    public txStatusBatch = this.setSecuredEndpoint<ITxStatusBatchRequest, ITxStatusBatchResponse>('post', 'txstatusMultiple', {
        requestTransformer: request => ({
            data: JSON.stringify({
                hashes: request.hashes
            })
        })
    });
}

export default AplaAPI;