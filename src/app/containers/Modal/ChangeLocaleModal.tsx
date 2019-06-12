/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { IModalProps } from 'components/Modal';
import { setLocale } from 'modules/engine/actions';

import ChangeLocaleModal, { IChangeLocaleModalProps } from 'components/Modal/ChangeLocale';

const mapStateToProps = (state: IRootState, props: IModalProps<IChangeLocaleModalProps, void>) => ({
    locales: state.engine.locales
});

export default connect(mapStateToProps, {
    setLocale: setLocale.started

}, (state, dispatch: any, props) => ({
    ...props,
    params: {
        ...props.params,
        locales: state.locales,
        onChangeLocale: dispatch.setLocale
    }
}))(ChangeLocaleModal);