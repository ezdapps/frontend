/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { modalClose } from 'modules/modal/actions';
import { destroyEditorTab } from 'modules/editor/actions';
import { IModalProps } from 'components/Modal';

import EditorCloseModal from 'components/Modal/EditorCloseModal';

interface Props {
    index: number;
}

const mapStateToProps = (state: IRootState, props: IModalProps<Props, void>) => {
    const tab = state.editor.tabs[props.params.index];
    return {
        name: tab ? tab.name : ''
    };
};

export default connect(mapStateToProps, {
    modalClose,
    destroyEditorTab

}, (state, dispatch: any, props: IModalProps<Props, void>) => ({
    ...props,
    params: {
        ...state
    },
    onResult: (_data: void) => {
        dispatch.modalClose({
            reason: 'RESULT',
            data: null
        });

        dispatch.destroyEditorTab(props.params.index);
    }
}))(EditorCloseModal);