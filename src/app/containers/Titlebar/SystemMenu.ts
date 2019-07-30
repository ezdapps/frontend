/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IRootState } from 'modules';
import { connect } from 'react-redux';
import { modalShow } from 'modules/modal/actions';

import SystemMenu from 'components/Titlebar/SystemMenu';

const mapStateToProps = (state: IRootState) => ({
    locale: state.storage.locale
});

const mapDispatchToProps = {
    modalShow: modalShow
};

export default connect(mapStateToProps, mapDispatchToProps, (state, dispatch: any, props) => ({
    ...props,
    onAbout: dispatch.modalShow({
        id: 'ABOUT',
        type: 'ABOUT',
        params: {}
    }),
    onChangeLocale: dispatch.modalShow({
        id: 'CHANGE_LOCALE',
        type: 'CHANGE_LOCALE',
        params: {
            value: state.locale
        }
    })
}))(SystemMenu);