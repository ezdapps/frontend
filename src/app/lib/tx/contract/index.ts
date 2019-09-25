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

import msgpack from 'msgpack-lite';
import * as convert from 'lib/tx/convert';
import { Int64BE } from 'int64-buffer';
import { privateToPublic, publicToID, sign, Sha256 } from 'lib/crypto';
import { encodeLengthPlusData, concatBuffer } from '../convert';
import { ISchema } from 'lib/tx/schema';
import IField from 'lib/tx/contract/field';
import { ITransactionBody } from 'apla/tx';

export interface IContractContext {
    id: number;
    schema: ISchema;
    ecosystemID: number;
    networkID: number;
    fields: {
        [name: string]: IContractParam;
    };
}

export interface IContractParam {
    type: string;
    value: object;
}

export default class Contract {
    private _context: IContractContext;
    private _keyID: Int64BE;
    private _time: number;
    private _publicKey: ArrayBuffer;
    private _fields: {
        [name: string]: IField;
    } = {};

    constructor(context: IContractContext) {
        this._context = context;
        this._time = Math.floor((new Date()).getTime() / 1000);
        Object.keys(context.fields).forEach(name => {
            const param = context.fields[name];
            const Field = this._context.schema.fields[param.type];
            const field = new Field();
            field.set(param.value);
            this._fields[name] = field;
        });
    }

    async sign(privateKey: string) {
        const publicKey = privateToPublic(privateKey);
        this._publicKey = convert.toArrayBuffer(publicKey);
        this._keyID = new Int64BE(publicToID(publicKey));

        const data = this.serialize();
        const txHash = await Sha256(data.buffer);
        const resultHash = await Sha256(txHash);
        const hexHash = await convert.toHex(resultHash);
        const signature = convert.toArrayBuffer(sign(hexHash, privateKey));

        return {
            hash: hexHash,
            header: this._context.schema.header,
            body: data.body,
            data: concatBuffer(
                this._context.schema.header,
                concatBuffer(
                    encodeLengthPlusData(data.buffer),
                    encodeLengthPlusData(signature)
                )
            )
        };
    }

    serialize() {
        const params: { [name: string]: object } = {};
        const codec = msgpack.createCodec({
            binarraybuffer: true,
            preset: true
        });

        Object.keys(this._fields).forEach(name => {
            params[name] = this._fields[name].get();
        });

        const body: ITransactionBody = {
            Header: {
                ID: this._context.id,
                Time: this._time,
                EcosystemID: this._context.ecosystemID,
                KeyID: this._keyID,
                NetworkID: this._context.networkID,
                PublicKey: this._publicKey
            },
            Params: params
        };

        const txBuffer = msgpack.encode(body, { codec });

        return {
            buffer: txBuffer,
            body
        };
    }
}