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
import imgLogo from 'images/logoInverse.svg';
import { FormattedMessage } from 'react-intl';

import Modal from './';

class AboutModal extends Modal<void, void> {
    openWebsite = () => {
        const electron = require('electron');
        electron.shell.openExternal(this.props.intl.formatMessage({
            id: 'legal.homepage',
            defaultMessage: 'https://apla.io'
        }));
    }

    render() {
        return (
            <div>
                <Modal.Header>
                    <FormattedMessage id="general.about" defaultMessage="About" />
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center" style={{ padding: '10px 20px', maxWidth: 350 }}>
                        <img src={imgLogo} style={{ height: 50 }} />
                        <div className="text-muted">
                            {process.env.REACT_APP_VERSION ? `v${process.env.REACT_APP_VERSION}` : 'DEVELOPER BUILD'}
                        </div>
                        <div>
                            <FormattedMessage id="legal.about" defaultMessage="Molis - a software product developed by Apla. It works with blockchain networks that are built to use Apla Protocol" />
                        </div>
                        <Button bsStyle="link" onClick={this.openWebsite}>
                            <FormattedMessage id="legal.homepage" defaultMessage="https://apla.io" />
                        </Button>
                    </div>
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
export default AboutModal;