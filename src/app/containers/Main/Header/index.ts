/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { connect } from 'react-redux';
import { IRootState } from 'modules';

import MainHeader from 'components/Main/Header';

const mapStateToProps = (state: IRootState) => ({
    isAuthorized: !!state.auth.privateKey
});

export default connect(mapStateToProps)(MainHeader);