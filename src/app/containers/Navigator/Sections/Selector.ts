/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import _ from 'lodash';
import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { ISection, TPageParams } from 'apla/content';

import Selector from 'components/Navigator/Sections/Selector';

const mapSectionParam = (section: ISection) => {
    const page = section.page ? section.page.name : section.defaultPage;
    const params: TPageParams = section.page ? section.page.params : {};

    return {
        title: section.title,
        name: section.name,
        page,
        params
    };
};

const mapStateToProps = (state: IRootState) => ({
    values: _.map(state.sections.sections, mapSectionParam) as any
});

export default connect(mapStateToProps)(Selector);