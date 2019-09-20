/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { connect } from 'react-redux';
import { securityProcess } from 'modules/auth/actions';
import { IModalProps } from 'components/Modal';
import { modalShow } from 'modules/modal/actions';

import SecurityNoticeModal from 'components/Modal/Auth/SecurityNoticeModal';

export default connect(
    null,
    {
        securityProcess,
        modalShow
    },
    (
        _state,
        dispatch: any,
        props: IModalProps<{ password: string }, boolean>
    ) => ({
        ...props,
        onResult: (useRemote: boolean) => {
            if (useRemote) {
                dispatch.securityProcess(props.params.password);
            } else {
                dispatch.modalShow({
                    id: 'ACCOUNT_PROCESS',
                    type: 'ACCOUNT_PROCESS',
                    params: {
                        password: props.params.password
                    }
                });
            }
        }
    })
)(SecurityNoticeModal);
