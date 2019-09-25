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
import { FormattedMessage } from 'react-intl';
import NetworkError from 'services/network/errors';

export interface IErrorProps {
    error: NetworkError;
}

const Error: React.SFC<IErrorProps> = props => (
    <div className="text-center mv-lg">
        <h1 className="mb-lg">
            <sup>
                <em className="fa fa-cog fa-2x text-muted fa-spin text-info" />
            </sup>
            <em className="fa fa-cog fa-5x text-muted fa-spin text-purple" />
            <em className="fa fa-cog fa-lg text-muted fa-spin text-success" />
        </h1>
        <div className="text-bold text-lg mb-lg">
            <FormattedMessage id={`general.network.error.${props.error}`} defaultMessage="Network is unreachable" />
        </div>
    </div>
);

export default Error;