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
import themed from 'components/Theme/themed';

interface Props {
    className?: string;
}

const Welcome: React.SFC<Props> = props => (
    <div className={props.className}>
        <h4 className="p0 m0">
            <FormattedMessage id="auth.welcome" defaultMessage="Welcome" />
        </h4>
        <p className="pv">
            <FormattedMessage
                id="auth.welcome.guide"
                defaultMessage="Before proceeding, you will be guided through the account creation process. This will not take too much time"
            />
        </p>
    </div>
);

export default themed(Welcome)`
    height: 100%;
    text-align: center;
    padding: 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
