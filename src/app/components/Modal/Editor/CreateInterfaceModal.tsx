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
import { Button } from 'react-bootstrap';

import Modal from '../';
import { FormattedMessage } from 'react-intl';
import Validation from 'components/Validation';

export interface ICreatePageModalProps {
    apps: {
        id: string;
        name: string;
    }[];
    type: 'block' | 'menu';
}

class CreateInterfaceModal extends Modal<ICreatePageModalProps, { name: string, app: string, conditions: string }> {
    onSubmit = (values: { [key: string]: any }) => {
        this.props.onResult({
            name: values.name,
            app: values.app,
            conditions: values.conditions
        });
    }

    render() {
        return (
            <Validation.components.ValidatedForm onSubmitSuccess={this.onSubmit}>
                <Modal.Header>
                    {'block' === this.props.params.type && (
                        <FormattedMessage id="editor.block.create" defaultMessage="Create block" />
                    )}
                    {'menu' === this.props.params.type && (
                        <FormattedMessage id="editor.menu.create" defaultMessage="Create menu" />
                    )}
                </Modal.Header>
                <Modal.Body>
                    <Validation.components.ValidatedFormGroup for="name">
                        <label htmlFor="name">
                            <FormattedMessage id="editor.page.name" defaultMessage="Name" />
                        </label>
                        <Validation.components.ValidatedControl key="name" name="name" validators={[Validation.validators.required]} />
                    </Validation.components.ValidatedFormGroup>
                    <Validation.components.ValidatedFormGroup for="app">
                        <label htmlFor="app">
                            <FormattedMessage id="editor.app" defaultMessage="Application" />
                        </label>
                        <Validation.components.ValidatedSelect name="app" defaultValue={this.props.params.apps[0].id} validators={[Validation.validators.required]}>
                            {this.props.params.apps.map(app => (
                                <option key={app.id} value={app.id}>{app.name}</option>
                            ))}
                        </Validation.components.ValidatedSelect>
                    </Validation.components.ValidatedFormGroup>
                    <Validation.components.ValidatedFormGroup for="conditions" className="mb0">
                        <label htmlFor="conditions">
                            <FormattedMessage id="editor.conditions.change" defaultMessage="Change conditions" />
                        </label>
                        <Validation.components.ValidatedTextarea name="conditions" validators={[Validation.validators.required]} />
                    </Validation.components.ValidatedFormGroup>
                </Modal.Body>
                <Modal.Footer className="text-right">
                    <Button type="button" bsStyle="link" onClick={this.props.onCancel.bind(this)}>
                        <FormattedMessage id="cancel" defaultMessage="Cancel" />
                    </Button>
                    <Validation.components.ValidatedSubmit bsStyle="primary">
                        <FormattedMessage id="confirm" defaultMessage="Confirm" />
                    </Validation.components.ValidatedSubmit>
                </Modal.Footer>
            </Validation.components.ValidatedForm>
        );
    }
}

export default CreateInterfaceModal;