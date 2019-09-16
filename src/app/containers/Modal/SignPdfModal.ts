/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { connect } from 'react-redux';
import { modalShow } from 'modules/modal/actions';
import { IModalProps } from 'components/Modal';
import { push } from 'connected-react-router';

import SecurityProcessModal from 'components/Modal/SignPdfModal';

export default connect(
    null,
    {
        modalShow,
        push
    },
    (
        _state,
        dispatch: any,
        props: IModalProps<
            {
                SAMLRequest: string;
                RelayState: string;
                redirect: string;
            },
            void
        >
    ) => ({
        ...props,
        onResult: (_data: void) => {
            props.onResult(null);
            if (props.params.redirect) {
                dispatch.push(props.params.redirect);
            }
        }
    })
)(SecurityProcessModal);
