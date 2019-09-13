/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { connect } from 'react-redux';
import { securityProcess } from 'modules/auth/actions';
import { IModalProps } from 'components/Modal';

import SecurityNoticeModal from 'components/Modal/Auth/SecurityNoticeModal';

export default connect(
    null,
    {
        securityProcess
    },
    (
        _state,
        dispatch: any,
        props: IModalProps<{ password: string }, void>
    ) => ({
        ...props,
        onResult: (_data: void) => {
            dispatch.securityProcess(props.params.password);
        }
    })
)(SecurityNoticeModal);
