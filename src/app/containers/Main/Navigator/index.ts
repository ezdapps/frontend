/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { connect } from 'react-redux';
import { IRootState } from 'modules';

import Navigator from 'components/Main/Navigator';

interface Props {
    section?: string;
    page?: string;
}

const mapStateToProps = (state: IRootState, props: Props) => {
    const sectionName = props.section || state.sections.mainSection;
    const section = state.sections.sections[sectionName];
    const page = props.page || section.defaultPage;

    return {
        stylesheet: state.content.stylesheet,
        section: sectionName,
        sections: state.sections.sections,
        page
    };
};

export default connect(mapStateToProps, {})(Navigator);