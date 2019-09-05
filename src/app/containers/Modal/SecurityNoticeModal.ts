/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { connect } from 'react-redux';
import { modalShow } from 'modules/modal/actions';
import { IModalProps } from 'components/Modal';

import SecurityNoticeModal from 'components/Modal/Auth/SecurityNoticeModal';

export default connect(
    null,
    {
        modalShow
    },
    (
        _state,
        dispatch: any,
        props: IModalProps<{ password: string }, void>
    ) => ({
        ...props,
        onResult: (_data: void) => {
            dispatch.modalShow({
                id: 'AUTH_SECURITY_PROCESS',
                type: 'AUTH_SECURITY_PROCESS',
                params: props.params
            });
        }
    })
)(SecurityNoticeModal);
