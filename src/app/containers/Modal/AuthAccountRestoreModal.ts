/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { connect } from 'react-redux';
import { modalShow } from 'modules/modal/actions';
import { IModalProps } from 'components/Modal';
import { restoreAccount } from 'modules/auth/actions';

import AuthAccountRestoreModal from 'components/Modal/Auth/AuthAccountRestoreModal';

export default connect(
    null,
    {
        modalShow,
        restoreAccount: restoreAccount.started
    },
    (
        _state,
        dispatch: any,
        props: IModalProps<{}, { privateKey: string; password: string }>
    ) => ({
        ...props,
        onResult: (payload: { privateKey: string; password: string }) => {
            props.onResult(payload);
            dispatch.restoreAccount(payload);
        }
    })
)(AuthAccountRestoreModal);
