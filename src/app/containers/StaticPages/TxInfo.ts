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

import { connect } from 'react-redux';
import { IRootState } from 'modules';

import TxInfo from 'components/StaticPages/TxInfo';

export interface ITxInfoProps {
    txhashes: string;
}

const txFilter = (hashes: string) => hashes
    .split(',')
    .filter(hash => /^[a-f0-9]{64}$/i.test(hash));

const findTx = (state: IRootState, hash: string) => {
    const keys = state.tx.transactions.keys();

    let value = keys.next();
    while (!value.done) {
        const stack = state.tx.transactions.get(value.value).stack;
        const tx = stack.find(l => l.hash === hash);

        if (tx) {
            return tx;
        }

        value = keys.next();
    }

    return undefined;
};

const mapStateToProps = (state: IRootState, props: ITxInfoProps) => {
    const network = state.auth.session && state.auth.session.network.uuid;
    const networkData = state.storage.networks.find(l => l.uuid === network);
    const txViewerUrl = networkData && networkData.txViewerUrl;

    return {
        stylesheet: state.content.printStylesheet,
        txStack: txFilter(props.txhashes)
            .map(hash => ({
                hash,
                tx: findTx(state, hash)
            })),
        externalLink: txViewerUrl && txViewerUrl.replace(/{txhashes}/g, txFilter(props.txhashes).join(','))
    };
};

export default connect(mapStateToProps)(TxInfo);