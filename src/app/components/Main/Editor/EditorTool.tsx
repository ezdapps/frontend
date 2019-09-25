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

import React from 'react';
import { TEditorTab } from 'apla/editor';

import ConstructorTabbed from 'containers/Main/Editor/ConstructorTabbed';
import Page from 'components/Main/Navigator/Page';

interface Props {
    mainSection: string;
    value: TEditorTab;
}

const EditorTool: React.SFC<Props> = props => {
    switch (props.value.tool) {
        case 'constructor':
            return (
                <ConstructorTabbed section={props.mainSection} pageID={props.value.id} pageName={props.value.name} />
            );

        case 'preview':
            return (
                <div className="flex-col flex-stretch scroll">
                    <Page
                        section={props.mainSection}
                        value={{
                            name: 'preview',
                            status: 'LOADED',
                            content: props.value.preview,
                            static: false,
                            params: {},
                            location: {
                                key: 'preview',
                                pathname: 'preview',
                                search: '',
                                state: '',
                                hash: ''
                            }
                        }}
                    />
                </div>
            );

        default:
            return null;
    }
};

export default EditorTool;