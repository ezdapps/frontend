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
import { modalShow } from 'modules/modal/actions';
import { IMapEditorEvent, TMapEditorType, TMapType } from 'apla/geo';
import { IModal } from 'apla/modal';

import { Validator } from 'components/Validation/Validators';
import ValidatedMap from 'components/Validation/ValidatedMap';

export interface IValidatedMapContainerProps {
    name: string;
    type: TMapEditorType;
    mapType?: TMapType;
    value?: IMapEditorEvent;
    center?: [number, number];
    zoom?: number;
    validators?: Validator[];
}

interface IValidatedMapContainerState {
    modal: IModal;
}

interface IValidatedMapContainerDispatch {
    modalShow: typeof modalShow;
}

class ValidatedMapContainer extends React.Component<IValidatedMapContainerProps & IValidatedMapContainerState & IValidatedMapContainerDispatch, { result: IMapEditorEvent }> {
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
            type: 'MAP_EDITOR',
            params
        });
    }

    componentWillReceiveProps(props: IValidatedMapContainerProps & IValidatedMapContainerState & IValidatedMapContainerDispatch) {
        const result = props.modal && this._id === props.modal.id && props.modal.result;
        if (result && 'RESULT' === result.reason) {
            this.setState({
                result: result.data
            });
        }
    }

    render() {
        return (
            <ValidatedMap
                name={this.props.name}
                mapType={this.props.mapType}
                validators={this.props.validators}
                value={this.state.result || this.props.value}
                center={this.props.center}
                zoom={this.props.zoom}
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

export default connect<IValidatedMapContainerState, IValidatedMapContainerDispatch, IValidatedMapContainerProps>(mapStateToProps, mapDispatchToProps)(ValidatedMapContainer);