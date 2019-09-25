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
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import NetworkError from 'services/network/errors';

import Error from './Error';

export interface IOfflineProps {
    error: NetworkError;
}

const Offline: React.SFC<IOfflineProps> = props => (
    <div>
        {props.error && (
            <Error error={props.error} />
        )}
        {!props.error && (
            <div style={{ padding: 30 }}>
                <i className="fa fa-chain-broken text-primary" style={{ fontSize: 128 }} />
                <h3>
                    <FormattedMessage id="general.network.notconnected" defaultMessage="Not connected" />
                </h3>
                <div className="text-muted">
                    <FormattedMessage id="general.network.notconnected.desc" defaultMessage="Please connect to a network to begin using Apla. You can manage networks by clicking on the connection indicator in the top right corner of this window" />
                </div>
                <div style={{ marginTop: 25 }}>
                    <Link to="/networks" className="btn btn-primary">
                        <FormattedMessage id="general.network.connect" defaultMessage="Connect" />
                    </Link>
                </div>
            </div>
        )}
    </div>
);

export default Offline;