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
import StyledComponent from './StyledComponent';

export interface ISpanProps {
    'className'?: string;
    'class'?: string;
}

class Span extends React.Component<ISpanProps> {
    render() {
        return (
            <span
                className={[this.props.class, this.props.className].join(' ')}
            >
                {this.props.children}
            </span>
        );
    }
}

export default StyledComponent(Span);
