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
import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { INotification } from 'apla/notifications';
import { destroyNotification } from 'modules/notifications/actions';

import Notifications from 'components/Notifications/NotificationsProvider';

export interface INotificationsProviderContainerProps {

}

interface INotificationsProviderContainerState {
    notifications: INotification[];
}

interface INotificationsProviderContainerDispatch {
    spawnNotification: (notification: INotification) => void;
    destroyNotification: (id: string) => void;
}

const NotificationsProviderContainer: React.SFC<INotificationsProviderContainerProps & INotificationsProviderContainerState & INotificationsProviderContainerDispatch> = props => (
    <Notifications {...props} />
);

const mapStateToProps = (state: IRootState) => ({
    notifications: state.notifications.notifications
});

const mapDispatchToProps = {
    destroyNotification
};

export default connect<INotificationsProviderContainerState, INotificationsProviderContainerDispatch, INotificationsProviderContainerProps>(mapStateToProps, mapDispatchToProps)(NotificationsProviderContainer);