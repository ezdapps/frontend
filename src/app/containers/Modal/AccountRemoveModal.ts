/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { connect } from 'react-redux';
import { IWallet } from 'apla/auth';
import { IModalProps } from 'components/Modal';
import { removeWallet } from 'modules/storage/actions';

import AuthAccountRemove from 'components/Modal/Auth/AuthAccountRemove';

export default connect(
    null,
    {
        removeWallet
    },
    (
        _state,
        dispatch: any,
        props: IModalProps<{ name: string; wallet: IWallet }, void>
    ) => ({
        ...props,
        onResult: (_data: void) => {
            dispatch.removeWallet(props.params.wallet);
            props.onResult(null);
        }
    })
)(AuthAccountRemove);
