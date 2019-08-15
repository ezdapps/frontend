/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

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