/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';

import { ModalContainer, IModalProps } from '../';
import ModalWindow from 'containers/Modal/ModalWindow';
import Button from 'components/Button/Button';

interface Params {
    password: string;
}

interface State {
    timer: number;
}

class SecurityProcessModal extends ModalContainer<
    IModalProps<Params, void>,
    State
> {
    public static className = ' ';

    private _mounted = true;
    private _interval: any;

    state: State = {
        timer: 5
    };

    componentDidMount() {
        this._interval = setInterval(() => {
            if (!this._mounted || 0 >= this.state.timer) {
                clearInterval(this._interval);
            } else {
                this.setState(oldState => ({
                    timer: oldState.timer - 1
                }));
            }
        }, 1000);
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    render() {
        return (
            <ModalWindow
                title="Create new account"
                width={400}
                icon="Key"
                controls={
                    <div>
                        <Button type="link" onClick={this.props.onCancel}>
                            Cancel
                        </Button>
                        <Button
                            onClick={() => this.props.onResult(null)}
                            disabled={0 < this.state.timer}
                        >
                            {0 >= this.state.timer
                                ? 'Continue'
                                : `Continue(${this.state.timer})`}
                        </Button>
                    </div>
                }
            >
                <img
                    src="http://3.bp.blogspot.com/-cZ-wg_Apc1g/UIYy_zVPRvI/AAAAAAAAAis/-QdxtTxoPAs/s1600/Own+New+Funny+Pic.jpg"
                    style={{ maxWidth: '100%', width: '100%' }}
                />
            </ModalWindow>
        );
    }
}
export default SecurityProcessModal;
