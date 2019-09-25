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

import * as React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'modules';

import Avatar from 'components/Avatar';

interface IAvatarContainerProps {
    className?: string;
    account: string;
    ecosystem: string;
    size?: number;
}

interface IAvatarContainerState {
    nodeHost: string;
}

interface IAvatarContainerDispatch {

}

const AvatarContainer: React.SFC<IAvatarContainerProps & IAvatarContainerState & IAvatarContainerDispatch> = props => (
    <Avatar
        className={props.className}
        size={props.size}
        url={`${props.nodeHost}/api/v2/avatar/${props.ecosystem}/${props.account}`}
    />
);

const mapStateToProps = (state: IRootState) => ({
    nodeHost: state.engine.guestSession.network.apiHost
});

const mapDispatchToProps = {
};

export default connect<IAvatarContainerState, IAvatarContainerDispatch, IAvatarContainerProps>(mapStateToProps, mapDispatchToProps)(AvatarContainer);