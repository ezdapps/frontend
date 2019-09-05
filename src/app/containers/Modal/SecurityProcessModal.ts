/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { connect } from 'react-redux';
import { modalShow } from 'modules/modal/actions';
import { IModalProps } from 'components/Modal';

import SecurityProcessModal from 'components/Modal/Auth/SecurityProcessModal';
import { createAccount } from 'modules/auth/actions';

export default connect(
    null,
    {
        modalShow,
        createAccount: createAccount.started
    },
    (
        _state,
        dispatch: any,
        props: IModalProps<{ password: string }, void>
    ) => ({
        ...props,
        onResult: (_data: void) => dispatch.createAccount(props.params.password)
    })
)(SecurityProcessModal);
