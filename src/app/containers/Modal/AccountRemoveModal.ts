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
import { IWallet } from 'apla/auth';
import { IModalProps } from 'components/Modal';
import { removeWallet } from 'modules/storage/actions';

import AuthAccountRemove from 'components/Modal/Auth/AuthAccountRemove';

export default connect(
    null,
    {
        removeWallet
    },
    (
        _state,
        dispatch: any,
        props: IModalProps<{ name: string; wallet: IWallet }, void>
    ) => ({
        ...props,
        onResult: (_data: void) => {
            dispatch.removeWallet(props.params.wallet);
            props.onResult(null);
        }
    })
)(AuthAccountRemove);
