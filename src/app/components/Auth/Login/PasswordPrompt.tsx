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
import styled from 'styled-components';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { ILoginCall, IAccountContext } from 'apla/auth';

import Avatar from 'containers/Avatar';
import Validation from 'components/Validation';
import HeadingNetwork from 'containers/Auth/HeadingNetwork';

export interface IPasswordPromptProps {
    className?: string;
    wallet: IAccountContext;
    onSubmit: (params: ILoginCall) => void;
    onCancel: () => void;
}

const PasswordPrompt: React.SFC<IPasswordPromptProps & InjectedIntlProps> = props => {
    const onSubmit = (values: { [key: string]: any }) =>
        props.onSubmit({
            password: values.password
        });

    return (
        <div className={props.className}>
            <Validation.components.ValidatedForm className="form-horizontal" onSubmitSuccess={onSubmit}>
                <HeadingNetwork onReturn={props.onCancel}>
                    <FormattedMessage id="auth.authentication" defaultMessage="Authentication" />
                </HeadingNetwork>
                <div className="text-center desktop-flex-stretch">
                    <div className="avatar-holder">
                        <Avatar
                            size={100}
                            account={props.wallet.wallet.address}
                            ecosystem={props.wallet.access.ecosystem}
                        />
                    </div>
                    <h4 className="text-center mt0">
                        {`${props.wallet.wallet.address} (${props.wallet.access.name || props.wallet.access.ecosystem})`}
                    </h4>
                    <p>
                        <FormattedMessage id="auth.session.prompt" defaultMessage="Please enter your password to sign in" />
                    </p>
                    <div className="password-prompt">
                        <Validation.components.ValidatedControl
                            type="password"
                            name="password"
                            placeholder={props.intl.formatMessage({ id: 'auth.password', defaultMessage: 'Enter your password...' })}
                        />
                        <Validation.components.ValidatedSubmit className="btn-block">
                            <em className="icon icon-login" />
                        </Validation.components.ValidatedSubmit>
                    </div>
                </div>
            </Validation.components.ValidatedForm>
        </div>
    );
};

export default styled(injectIntl(PasswordPrompt))`
    .avatar-holder {
        width: 100px;
        height: 100px;
        margin: 0 auto 15px auto;
    }

    .password-prompt {
        position: relative;
        padding-right: 80px;
        button {
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            width: 80px;
        }
    }
`;