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

import LocalizedDocumentTitle from 'components/DocumentTitle/LocalizedDocumentTitle';
import Action from './Action';
import HeadingNetwork from 'containers/Auth/HeadingNetwork';

export interface IActionSelectorProps {
    onImport: () => void;
    onCreate: () => void;
}

const ActionSelector: React.SFC<IActionSelectorProps> = (props) => (
    <LocalizedDocumentTitle title="auth.wallet" defaultTitle="Wallet">
        <div>
            <HeadingNetwork returnUrl="/">
                <FormattedMessage id="auth.wallet.actions" defaultMessage="Account actions" />
            </HeadingNetwork>
            <div className="text-left">
                <Action
                    icon="icon-wallet"
                    title={<FormattedMessage id="auth.havekey" defaultMessage="I have a key" />}
                    description={<FormattedMessage id="auth.havekey.desc" defaultMessage="If you are already familiar with Apla and have a backup of your private key, choose this option to guide you through the process of restoring your account data" />}
                    action={<FormattedMessage id="auth.import.existing" defaultMessage="Import existing key" />}
                    onClick={props.onImport}
                />
                <hr />
                <Action
                    icon="icon-lock"
                    title={<FormattedMessage id="auth.nokey" defaultMessage="I don't have a key" />}
                    description={<FormattedMessage id="auth.nokey.desc" defaultMessage="If you are new to the system or just want to create a new account, choose this option to generate a new private key and protect it with your password" />}
                    action={<FormattedMessage id="auth.generate.new" defaultMessage="Generate new key" />}
                    onClick={props.onCreate}
                />
            </div>
        </div>
    </LocalizedDocumentTitle>
);

export default ActionSelector;