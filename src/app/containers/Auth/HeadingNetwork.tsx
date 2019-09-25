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

import React from 'react';
import { IRootState } from 'modules';
import { connect } from 'react-redux';

import Heading from 'components/Auth/Heading';
import NetworkIndicator from 'components/Auth/Heading/NetworkIndicator';

const mapStateToProps = (state: IRootState) => {
    const network = state.engine.guestSession &&
        state.engine.guestSession.network &&
        state.storage.networks.find(l => l.uuid === state.engine.guestSession.network.uuid);

    return {
        option: React.createElement(NetworkIndicator, {
            navigateUrl: '/networks',
            status: state.engine.isConnecting ? 'PENDING' : network ? 'ONLINE' : 'OFFLINE'
        }, network && network.name) as React.ReactNode
    };
};

export default connect(mapStateToProps, {

})(Heading);