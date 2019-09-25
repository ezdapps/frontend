// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

import * as React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { TProtypoElement } from 'apla/protypo';

import ProtypoConstructor from 'components/ProtypoConstructor';

export interface IProtypoConstructorContainerProps {
    section: string;
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

const mapStateToProps = (state: IRootState, props: IProtypoConstructorContainerProps) => {
    const section = state.sections.sections[props.section];

    return {
        apiHost: state.auth.session && (state.auth.session.network.apiHost + '/api/v2'),
        page: section.page && section.page.name
    };
};

const mapDispatchToProps = {
};

export default connect<IProtypoConstructorContainerState, IProtypoConstructorContainerDispatch, IProtypoConstructorContainerProps>(mapStateToProps, mapDispatchToProps)(ProtypoConstructorContainer);