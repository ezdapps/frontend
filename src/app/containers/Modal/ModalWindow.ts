/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { connect } from 'react-redux';
import { modalClose } from 'modules/modal/actions';

import ModalWindow from 'components/Modal/ModalWindow';

const mapDispatchToProps = {
    onClose: () =>
        modalClose({
            reason: 'CANCEL',
            data: null
        })
};

export default connect<null, { onClose: () => void }, {}>(
    null,
    mapDispatchToProps
)(ModalWindow);
