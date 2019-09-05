/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { connect } from 'react-redux';
import { modalShow } from 'modules/modal/actions';
import { IModalProps } from 'components/Modal';

import CreateAccountModal from 'components/Modal/Auth/CreateAccountModal';

export default connect(
    null,
    {
        modalShow
    },
    (_state, dispatch: any, props: IModalProps<{}, string>) => ({
        ...props,
        onResult: (password: string) => {
            dispatch.modalShow({
                id: 'AUTH_SECURITY_NOTICE',
                type: 'AUTH_SECURITY_NOTICE',
                params: {
                    password
                }
            });
        }
    })
)(CreateAccountModal);
