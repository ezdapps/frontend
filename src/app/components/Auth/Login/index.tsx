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
import { Route, Switch } from 'react-router-dom';
import { IAccountContext } from 'apla/auth';

import WalletList from 'containers/Auth/Login/WalletList';
import PasswordPrompt from 'containers/Auth/Login/PasswordPrompt';

export interface ILoginProps {
    wallet: IAccountContext;
    isAuthenticating: boolean;
}

const Login: React.SFC<ILoginProps> = props => (
    <div>
        <Switch>
            {props.wallet && props.wallet.wallet && props.isAuthenticating ? <Route path="/" component={PasswordPrompt} /> : null}
            <Route path="/" component={WalletList} />
        </Switch>
    </div>
);

export default Login;