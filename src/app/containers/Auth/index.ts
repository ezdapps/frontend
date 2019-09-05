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
import { modalShow } from 'modules/modal/actions';

import Auth from 'components/Auth';

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

const selectNetworkStatus = (state: IRootState) => {
    const network = selectNetwork(state);

    if (state.engine.isConnecting) {
        return 'PENDING';
    } else if (network) {
        return 'ONLINE';
    } else {
        return 'OFFLINE';
    }
};

const mapStateToProps = (state: IRootState) => ({
    isEmpty: !state.storage.wallets || 0 === state.storage.wallets.length,
    networkStatus: selectNetworkStatus(state),
    activationEmail: selectActivationMail(state)
});

const mapDispatchToProps = {
    onCreate: () =>
        modalShow({
            id: 'CREATE_ACCOUNT',
            type: 'AUTH_CREATE_ACCOUNT',
            params: {}
        }),
    onRecover: () =>
        modalShow({
            id: 'AUTH_ACCOUNT_RESTORE',
            type: 'AUTH_ACCOUNT_RESTORE',
            params: {}
        })
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    (state, dispatch: any, props) => ({
        ...props,
        isEmpty: state.isEmpty,
        networkStatus: state.networkStatus,
        activationEnabled: !!state.activationEmail,
        onCreate: dispatch.onCreate,
        onRecover: dispatch.onRecover
    })
)(Auth);
