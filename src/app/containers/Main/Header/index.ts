/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { setMenuFolded } from 'modules/storage/actions';

import MainHeader from 'components/Main/Header';

const mapStateToProps = (state: IRootState) => ({
    isAuthorized: !!state.auth.privateKey,
    folded: state.storage.menuFolded
});

export default connect(
    mapStateToProps,
    {
        setMenuFolded
    },
    (state, dispatch: any, props) => ({
        ...props,
        isAuthorized: state.isAuthorized,
        onMenuClick: () => dispatch.setMenuFolded(!state.folded)
    })
)(MainHeader);
