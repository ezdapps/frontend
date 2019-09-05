/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { IWallet } from 'apla/auth';
import { modalShow } from 'modules/modal/actions';

import AccountList from 'components/AccountList';

const mapStateToProps = (state: IRootState) => ({
    items: state.storage.wallets
        .sort((a, b) => (a.id > b.id ? 1 : -1))
        .map(wallet => ({
            access: [],
            encKey: wallet.encKey,
            publicKey: wallet.publicKey,
            id: wallet.id,
            ...(state.auth.wallets || []).find(l => l.id === wallet.id)
        })),
    notifications: state.socket.notifications
});

const mapDispatchToProps = {
    onRemove: (params: { wallet: IWallet; name: string }) =>
        modalShow({
            id: 'AUTH_ACCOUNT_REMOVE',
            type: 'AUTH_ACCOUNT_REMOVE',
            params
        }),
    onSelect: (wallet: IWallet) =>
        modalShow({
            id: 'AUTH_LOGIN',
            type: 'AUTH_LOGIN',
            params: {
                wallet
            }
        }),
    onShare: (wallet: IWallet) =>
        modalShow({
            id: 'COPY_WALLET',
            type: 'COPY_WALLET',
            params: {
                wallet
            }
        })
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    (state, dispatch: any, props) => ({
        ...props,
        ...state,
        notifications: state.notifications,
        onRemove: dispatch.onRemove,
        onShare: dispatch.onShare,
        onSelect: dispatch.onSelect
    })
)(AccountList);
