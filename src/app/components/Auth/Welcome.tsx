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

export interface IWelcomeProps {

}

const Welcome: React.SFC<IWelcomeProps> = (props) => (
    <div>
        <h4 className="p0 m0">
            <FormattedMessage id="auth.welcome" defaultMessage="Welcome" />
        </h4>
        <p className="pv">
            <FormattedMessage id="auth.welcome.guide" defaultMessage="Before proceeding, you will be guided through the account creation process. This will not take too much time. After completing this process you will be able to use all features of Apla" />
        </p>
        <p>
            <FormattedMessage id="auth.welcome.continue" defaultMessage="Press 'Get started' button to begin the process of creating or restoring your account" />
        </p>
        <hr />
    </div>
);

export default Welcome;