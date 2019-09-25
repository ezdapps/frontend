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
import { navigate } from 'modules/engine/actions';

import ActionSelector from 'components/Auth/Wallet/ActionSelector';

export interface IActionSelectorContainerProps {

}

interface IActionSelectorContainerState {

}

interface IActionSelectorContainerDispatch {
    onImport: () => void;
    onCreate: () => void;
}

const mapStateToProps = (state: IRootState) => ({

});

const mapDispatchToProps = {
    onImport: () => navigate('/account/import'),
    onCreate: () => navigate('/account/create')
};

const ActionSelectorContainer: React.SFC<IActionSelectorContainerProps & IActionSelectorContainerState & IActionSelectorContainerDispatch> = props => (
    <ActionSelector {...props} />
);

export default connect<IActionSelectorContainerState, IActionSelectorContainerDispatch, IActionSelectorContainerProps>(mapStateToProps, mapDispatchToProps)(ActionSelectorContainer);