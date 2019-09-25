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
import { TProtypoElement } from 'apla/protypo';

import Modal from './';
import Page from 'components/Main/Navigator/Page';

export interface IPageModalProps {
    name: string;
    section: string;
    title: string;
    width?: number;
    tree: TProtypoElement[];
    params: {
        [key: string]: string;
    };
    static?: boolean;
}

class PageModal extends Modal<IPageModalProps, boolean> {
    onSuccess(values: { [key: string]: any }) {
        this.props.onResult(true);
    }

    render() {
        return (
            <div style={{ width: (this.props.params.width || 50) + 'vw', overflow: 'hidden' }}>
                <Modal.Header>
                    {this.props.params.title}
                </Modal.Header>
                <Modal.Body>
                    <Page
                        section={this.props.params.section}
                        value={{
                            name: this.props.params.name,
                            status: 'LOADED',
                            static: this.props.params.static,
                            content: this.props.params.tree,
                            params: this.props.params.params,
                            location: null
                        }}
                    />
                </Modal.Body>
            </div>
        );
    }
}
export default PageModal;