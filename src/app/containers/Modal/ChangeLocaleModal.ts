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
import { setLocale } from 'modules/engine/actions';

import ChangeLocaleModal from 'components/Modal/ChangeLocaleModal';

const mapStateToProps = (state: IRootState) => ({
    value: state.engine.locale,
    locales: state.engine.locales
});

export default connect(mapStateToProps, {
    setLocale: setLocale.started

}, (state, dispatch: any, props: IModalProps<any, any>) => ({
    ...props,
    params: {
        ...state,
        ...props.params,
        onChangeLocale: (locale: string) => {
            dispatch.setLocale(locale);
        }
    },
}))(ChangeLocaleModal);