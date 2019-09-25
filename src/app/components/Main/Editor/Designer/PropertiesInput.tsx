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
import { Col } from 'react-bootstrap';

export interface IPropertiesInputProps {
    name: string;
    title: string;
    placeholder?: string;
    value: string;
    onChange?: any;
    readOnly?: boolean;
}

const PropertiesInput: React.SFC<IPropertiesInputProps> = (props) => {
    return (
        <div className="form-group">
            <label className="col-xs-3 control-label g-no-padding">
                <small>{props.title}</small>
            </label>
            <Col xs={9}>
                <input
                    type="text"
                    className="form-control input-sm"
                    placeholder={props.placeholder || props.title}
                    value={props.value}
                    onChange={props.onChange}
                    readOnly={!!props.readOnly}
                />
            </Col>
        </div>
    );

};

export default PropertiesInput;
