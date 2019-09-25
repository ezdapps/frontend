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
import { login, selectWallet, removeWallet, loginGuest } from 'modules/auth/actions';
import { navigate } from 'modules/engine/actions';
import { IWallet } from 'apla/auth';
import { modalShow } from 'modules/modal/actions';

import WalletList from 'components/Auth/Login/WalletList';

const selectNetwork = (state: IRootState) => {
    const session = state.engine.guestSession;
    if (!session) {
        return undefined;
    }

    return state.storage.networks.find(l => l.uuid === session.network.uuid);
};

const selectActivationMail = (state: IRootState) => {
    const network = selectNetwork(state);
    return network ? network.activationEmail : '';
};

const selectDemoEnabled = (state: IRootState) => {
    const network = selectNetwork(state);
    return network ? network.demoEnabled : false;
};

const mapStateToProps = (state: IRootState) => ({
    isOffline: !state.engine.guestSession,
    pending: state.auth.isLoggingIn,
    wallets: state.storage.wallets.sort((a, b) => a.id > b.id ? 1 : -1).map(wallet => ({
        access: [],
        encKey: wallet.encKey,
        publicKey: wallet.publicKey,
        id: wallet.id,
        ...(state.auth.wallets || []).find(l => l.id === wallet.id)
    })),
    notifications: state.socket.notifications,
    activationEmail: selectActivationMail(state),
    demoModeEnabled: selectDemoEnabled(state)
});

const mapDispatchToProps = {
    onRemove: removeWallet,
    onLogin: login.started,
    onSelect: selectWallet,
    onCopy: (wallet: IWallet) => modalShow({
        id: 'COPY_WALLET',
        type: 'COPY_WALLET',
        params: {
            wallet
        }
    }),
    onRegister: (wallet: IWallet, activationEmail: string) => modalShow({
        id: 'REGISTER_WALLET',
        type: 'REGISTER_WALLET',
        params: {
            wallet,
            activationEmail
        }
    }),
    onCreate: () => navigate('/account'),
    onGuestLogin: () => loginGuest.started(undefined)
};

export default connect(mapStateToProps, mapDispatchToProps, (state, dispatch: any, props) => ({
    ...props,
    isOffline: state.isOffline,
    pending: state.pending,
    wallets: state.wallets,
    notifications: state.notifications,
    activationEnabled: !!state.activationEmail,
    demoModeEnabled: state.demoModeEnabled,
    onRemove: dispatch.onRemove,
    onLogin: dispatch.onLogin,
    onSelect: dispatch.onSelect,
    onCopy: dispatch.onCopy,
    onRegister: (wallet: IWallet) => dispatch.onRegister(wallet, state.activationEmail),
    onCreate: dispatch.onCreate,
    onGuestLogin: dispatch.onGuestLogin

}))(WalletList);