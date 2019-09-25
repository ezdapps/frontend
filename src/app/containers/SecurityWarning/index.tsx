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
import { connect } from 'react-redux';
import { IRootState } from 'modules';
import SecurityWarning from 'components/SecurityWarning';
import { closeSecurityWarning } from 'modules/storage/actions';

export interface ISecurityWarningContainerProps {
    closed?: boolean;
}

interface ISecurityWarningContainerState {
}

interface ISecurityWarningContainerDispatch {
    close: () => void;
}

const SecurityWarningContainer: React.SFC<ISecurityWarningContainerProps & ISecurityWarningContainerState & ISecurityWarningContainerDispatch> = props => (
    <SecurityWarning {...props} />
);

const mapStateToProps = (state: IRootState) => ({
    closed: state.storage.securityWarningClosed
});

const mapDispatchToProps = {
    close: closeSecurityWarning
};

export default connect<ISecurityWarningContainerState, ISecurityWarningContainerDispatch, ISecurityWarningContainerProps>(mapStateToProps, mapDispatchToProps)(SecurityWarningContainer);