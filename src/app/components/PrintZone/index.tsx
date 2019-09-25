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
import Button from 'components/Button';
import { sendAttachment } from 'lib/fs';
import { FormattedMessage } from 'react-intl';

export interface IPrintZoneProps {
    stylesheet: string;
    externalLink?: string;
}

class PrintZone extends React.Component<IPrintZoneProps> {
    private _container: HTMLDivElement;
    private _output: HTMLIFrameElement;

    componentDidUpdate() {
        this.onRepaint();
    }

    componentDidMount() {
        this.onRepaint();
    }

    onRepaint = () => {
        setTimeout(() => {
            if (!this._output || !this._output.contentDocument.body) {
                return;
            }

            this._output.style.height = '0px';
            this._output.contentDocument.body.innerHTML = this._container.innerHTML;
            const style = this._output.contentDocument.createElement('style');
            style.innerText = this.props.stylesheet;
            this._output.contentDocument.body.appendChild(style);
            this._output.style.height = this._output.contentDocument.body.scrollHeight + 'px';
        });
    }

    onSave = () => {
        sendAttachment('Tx.html', this._output.contentDocument.body.innerHTML, 'text/html');
    }

    onPrint = () => {
        this._output.contentWindow.focus();
        this._output.contentWindow.print();
    }

    render() {
        return (
            <div>
                <div ref={l => this._container = l} style={{ position: 'absolute', top: -50000, left: -50000 }}>
                    {this.props.children}
                </div>
                <iframe
                    ref={l => this._output = l}
                    scrolling="no"
                    style={{
                        background: '#fff',
                        width: '100%',
                        boxSizing: 'border-box',
                        border: 'dashed 1px #999',
                        outline: 0,
                        padding: 0,
                        margin: 0
                    }}
                />
                <hr />
                <span>
                    <Button className="btn btn-primary" onClick={this.onSave}>
                        <FormattedMessage id="general.save" defaultMessage="Save" />
                    </Button>
                </span>
                <span style={{ marginLeft: 15 }}>
                    <Button className="btn btn-primary" onClick={this.onPrint}>
                        <FormattedMessage id="general.print" defaultMessage="Print" />
                    </Button>
                </span>
                {this.props.externalLink && (
                    <span>
                        <a className="btn btn-primary ml" href={`https://${this.props.externalLink}`} target="_blank">
                            <FormattedMessage id="general.explorerview" defaultMessage="View in Explorer" />
                        </a>
                    </span>
                )}
            </div>
        );
    }
}

export default PrintZone;