/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { TProtypoElement } from 'apla/protypo';

import ProtypoConstructor from 'components/ProtypoConstructor';

export interface IProtypoConstructorContainerProps {
    editable?: boolean;
    wrapper?: JSX.Element;
    context: string;
    content: TProtypoElement[];
    changePage?: any;
    setTagCanDropPosition?: any;
    addTag?: any;
    moveTag?: any;
    copyTag?: any;
    removeTag?: any;
    selectTag?: any;
    selectedTag?: any;
    logic?: boolean;
}

interface IProtypoConstructorContainerState {
    apiHost: string;
    page: string;
}

interface IProtypoConstructorContainerDispatch {
}

const ProtypoConstructorContainer: React.SFC<IProtypoConstructorContainerState & IProtypoConstructorContainerDispatch & IProtypoConstructorContainerProps> = (props) => (
    <ProtypoConstructor {...props} />
);

const mapStateToProps = (state: IRootState) => {
    const section = state.sections.sections[state.sections.section];

    return {
        apiHost: state.auth.session && (state.auth.session.network.apiHost + '/api/v2'),
        section: state.sections.section,
        page: section.page && section.page.name
    };
};

const mapDispatchToProps = {
};

export default connect<IProtypoConstructorContainerState, IProtypoConstructorContainerDispatch, IProtypoConstructorContainerProps>(mapStateToProps, mapDispatchToProps)(ProtypoConstructorContainer);