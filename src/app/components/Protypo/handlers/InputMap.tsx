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
import { TMapType } from 'apla/geo';
import { IMapValue, parseData } from 'components/Protypo/handlers/Map';

import Validation from 'components/Validation';

export interface IInputMapProps {
    name: string;
    value: string;
    maptype: TMapType;
}

const InputMap: React.SFC<IInputMapProps> = (props) => {
    const value: IMapValue = parseData(props.value) || {
        type: 'point',
        coords: [],
        area: 0,
        address: ''
    };

    return (
        <Validation.components.ValidatedMap
            name={props.name}
            value={value}
            zoom={value.zoom}
            center={value.center}
            type={value.type}
            mapType={props.maptype}
        />
    );
};

export default InputMap;