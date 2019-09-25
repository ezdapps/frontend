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
import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { ILocale } from 'apla';

import Modal from './';

export interface IChangeLocaleModalProps {
    onChangeLocale: (locale: string) => void;
    locales: ILocale[];
    value: string;
}

class ChangeLocaleModal extends Modal<IChangeLocaleModalProps, void> {
    changeLocale = (locale: string) => {
        this.props.params.onChangeLocale(locale);
        this.props.onCancel();
    }

    render() {
        return (
            <div>
                <Modal.Header>
                    Switch language
                </Modal.Header>
                <Modal.Body>
                    {this.props.params.locales.map(l => (
                        <Button key={l.key} block disabled={!l.enabled || l.key === this.props.params.value} type="button" bsStyle="default" onClick={() => this.changeLocale(l.key)}>
                            <span>{l.name}</span>
                        </Button>
                    ))}
                </Modal.Body>
                <Modal.Footer className="text-right">
                    <Button type="button" bsStyle="primary" onClick={this.props.onCancel.bind(this)}>
                        <FormattedMessage id="close" defaultMessage="Close" />
                    </Button>
                </Modal.Footer>
            </div>
        );
    }
}
export default ChangeLocaleModal;