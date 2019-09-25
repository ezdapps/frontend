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
