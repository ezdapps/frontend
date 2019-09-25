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
import { discoverNetwork, navigate } from 'modules/engine/actions';
import { INetwork } from 'apla/auth';

import NetworkList from 'components/Auth/Login/NetworkList';
import { modalShow } from 'modules/modal/actions';

const sortNetworks = (a: INetwork, b: INetwork) =>
    a.uuid < b.uuid ? 1 : -1;

const selectNetworks = (state: IRootState) => {
    const preconfiguredNetworks = state.storage.networks.filter(l =>
        !!state.engine.preconfiguredNetworks.find(n => n.uuid === l.uuid)
    ).sort(sortNetworks);

    const savedNetworks = state.storage.networks.filter(l =>
        !state.engine.preconfiguredNetworks.find(n => n.uuid === l.uuid)
    ).sort(sortNetworks);

    return {
        preconfiguredNetworks,
        networks: savedNetworks
    };
};

const mapStateToProps = (state: IRootState) => ({
    pending: state.engine.isConnecting,
    current: state.engine.guestSession && state.engine.guestSession.network,
    ...selectNetworks(state)
});

export default connect(mapStateToProps, {
    onConnect: (uuid: string) => discoverNetwork.started({ uuid }),
    onAddNetwork: () => navigate('/networks/add'),
    onRemove: (network: INetwork) => modalShow({
        id: 'REMOVE_NETWORK',
        type: 'REMOVE_NETWORK',
        params: {
            uuid: network.uuid,
            name: network.name
        }
    })

})(NetworkList);