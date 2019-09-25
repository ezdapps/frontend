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
import { DragDropContext } from 'react-dnd';
import { initialize } from 'modules/engine/actions';
import HTML5Backend from 'react-dnd-html5-backend';

import App from 'components/App';

const mapStateToProps = (state: IRootState) => ({
    locale: state.engine.locale || 'en-US',
    localeMessages: state.engine.localeMessages,
    isSessionAcquired: state.auth.isAcquired,
    isAuthenticated: state.auth.isAuthenticated,
    isLoaded: state.engine.isLoaded,
    isFatal: !!state.engine.fatalError,
    securityWarningClosed: state.storage.securityWarningClosed,
    network: state.engine.guestSession && state.engine.guestSession.network
});

const mapDispatchToProps = {
    initialize: initialize.started
};

export default DragDropContext(HTML5Backend)(
    connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(App)
);
