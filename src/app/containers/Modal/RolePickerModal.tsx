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

import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { IModalProps } from 'components/Modal';
import { switchWallet } from 'modules/auth/actions';
import { modalClose } from 'modules/modal/actions';

import RolePickerModal from 'components/Modal/RolePickerModal';

export interface IRolePickerModalProps {
    account: string;
    ecosystem: string;
}

const mapStateToProps = (state: IRootState, props: IModalProps<IRolePickerModalProps, void>) => ({
    ...props,
    params: {
        account: state.auth.wallet.wallet.address,
        ecosystem: props.params.ecosystem,
        ecosystemName: state.auth.wallets
            .find(w => w.id === state.auth.wallet.wallet.id).access.find(a => a.ecosystem === props.params.ecosystem).name,
        roles: state.auth.wallets
            .find(w => w.id === state.auth.wallet.wallet.id).access.find(a => a.ecosystem === props.params.ecosystem).roles
    }
});

export default connect(mapStateToProps, {
    onSwitchWallet: switchWallet,
    modalClose: modalClose

}, (state, dispatch: any, props) => ({
    ...state,
    onSwitchWallet: (role: string) => {
        dispatch.modalClose({
            reason: 'CLOSE',
            data: null
        });
        dispatch.onSwitchWallet({
            ecosystem: props.params.ecosystem,
            role
        });
    }
}))(RolePickerModal);