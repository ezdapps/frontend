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

import _ from 'lodash';
import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { ISection, TPageParams } from 'apla/content';

import Selector from 'components/Main/Navigator/Sections/Selector';

const mapSectionParam = (section: ISection) => {
    const page = section.page ? section.page.name : section.defaultPage;
    const params: TPageParams = section.page ? section.page.params : {};

    return {
        index: section.index,
        title: section.title,
        name: section.name,
        page,
        params
    };
};

const mapStateToProps = (state: IRootState, props: { section?: string }) => ({
    section: null === props.section ? null : (props.section || state.sections.mainSection),
    values: _.map(state.sections.sections, mapSectionParam).sort((a, b) => a.index - b.index)
});

export default connect(mapStateToProps)(Selector);