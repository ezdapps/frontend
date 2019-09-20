/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { connect } from 'react-redux';
import { accountProcess } from 'modules/auth/actions';
import { IModalProps } from 'components/Modal';

import AccountProcessModal from 'components/Modal/Auth/AccountProcessModal';

export default connect(
    null,
    {
        accountProcess
    },
    (
        _state,
        dispatch: any,
        props: IModalProps<
            { password: string },
            { email: string; firstName: string; lastName: string }
        >
    ) => ({
        ...props,
        onResult: (data: {
            email: string;
            firstName: string;
            lastName: string;
        }) => {
            props.onResult(data);
            dispatch.accountProcess({
                ...data,
                password: props.params.password
            });
        }
    })
)(AccountProcessModal);
