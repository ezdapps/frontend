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
import * as uuid from 'uuid';
import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { IModal } from 'apla/modal';
import { modalShow } from 'modules/modal/actions';

import { Validator } from 'components/Validation/Validators';
import ValidatedImage from 'components/Validation/ValidatedImage';

export interface IValidatedImageContainerProps {
    format: 'png' | 'jpg' | 'jpeg';
    name: string;
    aspectRatio?: number;
    width?: number;
    validators?: Validator[];
}

interface IValidatedImageContainerState {
    modal: IModal;
}

interface IValidatedImageContainerDispatch {
    modalShow: typeof modalShow;
}

class ValidatedImageContainer extends React.Component<IValidatedImageContainerProps & IValidatedImageContainerState & IValidatedImageContainerDispatch, { result: string }> {
    private _id: string = uuid.v4();

    constructor(props: any) {
        super(props);
        this.state = {
            result: null
        };
    }

    openEditor(params: { mime: string, data: string, aspectRatio: number, width: number }) {
        this.props.modalShow({
            id: this._id,
            type: 'IMAGE_EDITOR',
            params
        });
    }

    componentWillReceiveProps(props: IValidatedImageContainerProps & IValidatedImageContainerState & IValidatedImageContainerDispatch) {
        const result = props.modal && this._id === props.modal.id && props.modal.result;
        if (result && 'RESULT' === result.reason) {
            this.setState({
                result: result.data
            });
        }
    }

    render() {
        return (
            <ValidatedImage
                format={this.props.format}
                name={this.props.name}
                aspectRatio={this.props.aspectRatio}
                width={this.props.width}
                validators={this.props.validators}
                value={this.state.result}
                openEditor={this.openEditor.bind(this)}
            />
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    modal: state.modal
});

const mapDispatchToProps = {
    modalShow: modalShow
};

export default connect<IValidatedImageContainerState, IValidatedImageContainerDispatch, IValidatedImageContainerProps>(mapStateToProps, mapDispatchToProps)(ValidatedImageContainer);