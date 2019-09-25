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
import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { IModalProps } from 'components/Modal';
import { FormattedMessage } from 'react-intl';
import { modalShow } from 'modules/modal/actions';

import BackupModal from 'components/Modal/BackupModal';

const mapStateToProps = (state: IRootState) => ({
    privateKey: state.auth.privateKey,
    publicKey: state.auth.wallet.wallet.publicKey,
    address: state.auth.wallet.wallet.address
});

export default connect(mapStateToProps, {
    modalShow

}, (state, dispatch: any, props: IModalProps<any, any>) => ({
    ...props,
    params: {
        ...state,
        onCopy: () => dispatch.modalShow({
            id: 'I_COPIED',
            type: 'INFO',
            params: {
                value: (<FormattedMessage id="alert.clipboard.copied" defaultMessage="alert.clipboard.copied" />)
            }
        })
    },
}))(BackupModal);