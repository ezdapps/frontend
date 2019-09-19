/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';

import { ModalContainer, IModalProps } from '../';
import ModalWindow from 'containers/Modal/ModalWindow';
import Button from 'components/Button/Button';

interface Params {
    keys: {
        private: string;
        public: string;
    };
    password: string;
    SAMLRequest: string;
    RelayState: string;
}

interface State {
    result?: boolean;
}

class SecurityProcessModal extends ModalContainer<
    IModalProps<Params, void>,
    State
> {
    public static className = ' ';

    state: State = {};

    componentDidMount() {
        const frame = document.getElementById('postFrame') as HTMLIFrameElement;
        const doc = frame.contentWindow.document;
        doc.open();
        doc.close();

        frame.contentDocument.body.innerHTML =
            '<form method="post" action="https://orely.luxtrust.com/FederatedServiceFrontEnd/saml/dss/req">' +
            '<input name="SAMLRequest" type="hidden" value="' +
            this.props.params.SAMLRequest +
            '"/>' +
            '<input name="RelayState" type="hidden" value="' +
            this.props.params.RelayState +
            '"/>' +
            '<input id="sendForm" type="submit" value="Send" style="position:absolute;top:-999999px;left:-999999px"/>' +
            '</form>';

        const sendButton = frame.contentDocument.getElementById('sendForm');
        sendButton.click();

        window.addEventListener('message', this.handleMessage);
    }

    componentWillUnmount() {
        window.removeEventListener('message', this.handleMessage);
    }

    handleMessage = (event: any) => {
        if (
            event.data &&
            'luxtrust_result' === event.data.type &&
            'xml' === event.data.operation
        ) {
            const result = 'true' === event.data.data;

            this.setState({
                result
            });

            if (result) {
                this.props.onResult(null);
            }
        }
    }

    render() {
        return (
            <ModalWindow
                title="Create or Recover Account"
                width={400}
                icon="Key"
                controls={
                    <div>
                        <Button type="link" onClick={this.props.onCancel}>
                            Cancel
                        </Button>
                    </div>
                }
            >
                {this.state.result === false && (
                    <div>User authentication failure</div>
                )}
                {undefined === this.state.result && (
                    <iframe
                        id="postFrame"
                        style={{ width: '100%', height: '400px', border: 0 }}
                    />
                )}
            </ModalWindow>
        );
    }
}
export default SecurityProcessModal;
