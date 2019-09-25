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

import { INetworkEndpoint } from 'apla/auth';
import AplaAPI from 'lib/aplaAPI';
import keyring from 'lib/keyring';
import NetworkError from './errors';

export const discover = async (network: INetworkEndpoint, key: string, networkID?: number) => {
    const client = new AplaAPI({
        apiHost: network.apiHost
    });

    try {
        var uid = await client.getUid();
    }
    catch {
        throw NetworkError.Offline;
    }

    if ('number' === typeof networkID && uid.networkID !== networkID) {
        throw NetworkError.IDMismatch;
    }

    try {
        const tempClient = client.authorize(uid.token);
        const loginResult = await tempClient.login({
            publicKey: keyring.generatePublicKey(key),
            signature: keyring.sign(uid.uid, key)
        });
        const securedClient = client.authorize(loginResult.token);
        const socketUrl: string | undefined = await client.getConfig({ name: 'centrifugo' }).catch(e => undefined);
        const fullNodesPlain = (await securedClient.getSystemParams({ names: ['full_nodes'] }))
            .list
            .find(l => 'full_nodes' === l.name)
            .value;

        try {
            var fullNodes: string[] = JSON.parse(fullNodesPlain)
                .map((l: any) => l.api_address);
        }
        catch {
            fullNodes = [network.apiHost];
        }

        return {
            networkID: uid.networkID,
            socketUrl,
            loginResult,
            fullNodes
        };
    }
    catch {
        throw NetworkError.ServerMisconfiguration;
    }
};