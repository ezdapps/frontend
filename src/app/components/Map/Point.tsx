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
import { loadModules } from 'react-arcgis';

export interface IPointProps {
    view?: __esri.MapView;
    coords: [number, number];
}

class Point extends React.Component<IPointProps> {
    private _graphic: __esri.Graphic = null;

    render() {
        return null as JSX.Element;
    }

    componentWillReceiveProps(props: IPointProps) {
        this.redraw(props.coords);
    }

    componentWillMount() {
        this.redraw(this.props.coords);
    }

    componentWillUnmount() {
        this.props.view.graphics.remove(this._graphic);
    }

    redraw(coords: [number, number]) {
        loadModules(['esri/Graphic']).then((deps: [__esri.GraphicConstructor]) => {
            const [Graphic] = deps;

            const point = {
                type: 'point',
                longitude: coords[0],
                latitude: coords[1]
            };

            const fillSymbol = {
                type: 'simple-marker',
                color: [226, 119, 40]
            };

            const graphic = new Graphic({
                geometry: point as any,
                symbol: fillSymbol
            });

            this._graphic = graphic;
            this.props.view.graphics.add(graphic);
        }).catch((err) => { /* Silently suppress errors */ });
    }
}

export default Point;