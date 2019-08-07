/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { menuPop } from 'modules/sections/actions';

import Sections from 'components/Main/Navigator/Sections';

const mapStateToProps = (state: IRootState) => ({
    values: state.sections.sections,
    navigationSize: state.storage.navigationSize
});

const mapDispatchToProps = {
    menuPop: menuPop
};

export default connect(mapStateToProps, mapDispatchToProps)(Sections);