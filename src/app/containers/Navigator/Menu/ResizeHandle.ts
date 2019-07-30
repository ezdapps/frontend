/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { setResizing } from 'modules/content/actions';
import { saveNavigationSize } from 'modules/storage/actions';

import ResizeHandle from 'components/Navigator/Menu/ResizeHandle';

const mapStateToProps = (state: IRootState) => ({
    width: state.storage.navigationSize,
    resizing: state.content.navigationResizing,
    disabled: !state.engine.isCollapsed
});

const mapDispatchToProps = {
    setResizing,
    navigationResize: saveNavigationSize,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResizeHandle);