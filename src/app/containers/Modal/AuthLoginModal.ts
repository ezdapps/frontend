/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { connect } from 'react-redux';
import { IWallet } from 'apla/auth';
import { modalShow } from 'modules/modal/actions';
import { loginAccount } from 'modules/auth/actions';
import { IModalProps } from 'components/Modal';

import AuthLoginModal from 'components/Modal/Auth/AuthLoginModal';

export default connect(
    null,
    {
        modalShow,
        loginAccount: loginAccount.started
    },
    (
        _state,
        dispatch: any,
        props: IModalProps<{ wallet: IWallet }, string>
    ) => ({
        ...props,
        onResult: (password: string) => {
            props.onResult(password);

            if (password) {
                dispatch.loginAccount({
                    account: props.params.wallet,
                    password
                });
            } else {
                dispatch.modalShow({
                    id: 'AUTH_ERROR',
                    type: 'AUTH_ERROR',
                    params: {
                        error: 'E_INVALID_PASSWORD'
                    }
                });
            }
        }
    })
)(AuthLoginModal);
