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
import { menuPop } from 'modules/sections/actions';
import { setMenuActive } from 'modules/content/actions';

import Menu from 'components/Main/Navigator/Menu';

export interface INavigationProps {
    section: string;
}

const mapStateToProps = (state: IRootState, props: INavigationProps) => {
    const section = state.sections.sections[props.section];
    return {
        menus: section ? section.menus : [],
        folded: state.storage.menuFolded,
        active: state.content.menuActive
    };
};

const mapDispatchToProps = {
    menuPop,
    setMenuActive
};

export default connect(mapStateToProps, mapDispatchToProps, (state, dispatch: any, props) => ({
    ...state,
    ...props,
    menuPop: () => dispatch.menuPop(props.section),
    onMouseOver: () => {
        if (state.folded && !state.active) {
            dispatch.setMenuActive(true);
        }
    },
    onMouseLeave: () => {
        if (state.folded && state.active) {
            dispatch.setMenuActive(false);
        }
    }
}))(Menu);