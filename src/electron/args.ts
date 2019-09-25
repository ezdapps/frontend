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

import * as commander from 'commander';
import { IInferredArguments } from 'apla/gui';

// Normalize electron launch arguments
const argv = process.argv.slice();
const executable = argv.shift();
if (!argv[0] || argv[0] && argv[0] !== '.') {
    argv.unshift('');
}
argv.unshift(executable);

const command = commander
    .option('-n, --full-node <url>', null, (value, stack) => {
        stack.push(value);
        return stack;
    }, [])
    .option('-k, --private-key <key>')
    .option('-d, --dry')
    .option('-x, --offset-x <value>', null, parseInt)
    .option('-y, --offset-y <value>', null, parseInt)
    .option('-i, --network-id <value>', null, parseInt)
    .option('-m, --network-name <value>', 'Default network')
    .option('-s, --socket-url <url>', null)
    .option('-u, --disable-full-nodes-sync', null)
    .option('-g, --guest-mode')
    .option('-e, --activation-email', null)
    .parse(argv);

const args: IInferredArguments = {
    privateKey: command.privateKey,
    fullNode: command.fullNode,
    dry: command.dry,
    offsetX: command.offsetX,
    offsetY: command.offsetY,
    networkID: command.networkId,
    networkName: command.networkName,
    socketUrl: command.socketUrl,
    disableFullNodesSync: command.disableFullNodesSync,
    guestMode: command.guestMode
};

export default args;