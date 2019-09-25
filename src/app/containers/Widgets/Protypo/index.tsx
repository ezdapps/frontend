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
import { displayData } from 'modules/content/actions';
import { menuPush } from 'modules/sections/actions';
import { TProtypoElement } from 'apla/protypo';

export interface IProtypoProps {
    wrapper?: JSX.Element;
    context: string;
    page?: string;
    menu?: string;
    section: string;
    content: TProtypoElement[];
}

import Protypo from 'components/Protypo';

const mapStateToProps = (state: IRootState, props: IProtypoProps) => ({
    apiHost: state.auth.session && (state.auth.session.network.apiHost + '/api/v2'),
    page: props.page,
    ...props
});

export default connect(mapStateToProps, {
    menuPush,
    displayData: displayData.started

})(Protypo as any);