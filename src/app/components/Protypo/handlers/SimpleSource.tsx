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
import propTypes from 'prop-types';
import { ISource } from 'apla/protypo';

import Protypo from '../';

export interface ISimpleSourceProps extends ISource {
    source: string;
}

interface ISimpleSourceContext {
    protypo: Protypo;
}

const SimpleSource: React.SFC<ISimpleSourceProps> = (props, context: ISimpleSourceContext) => {
    context.protypo.registerSource(props.source, {
        columns: props.columns,
        types: props.types,
        data: props.data
    });
    return null;
};

SimpleSource.contextTypes = {
    protypo: propTypes.object.isRequired
};

export default SimpleSource;