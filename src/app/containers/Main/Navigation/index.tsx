/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { menuPop } from 'modules/sections/actions';

import Navigation from 'components/Main/Navigation';

export interface INavigationProps {
    section: string;
}

const mapStateToProps = (state: IRootState, props: INavigationProps) => {
    const section = state.sections.sections[props.section];
    return {
        width: state.storage.navigationSize,
        menus: section ? section.menus : []
    };
};

export default connect(mapStateToProps, {
    menuPop
})(Navigation);