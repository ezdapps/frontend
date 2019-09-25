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
import themed from 'components/Theme/themed';
import Tooltip from 'components/Tooltip';

export interface IHintProps {
    'icon'?: string;
    'title'?: string;
    'text'?: string;
}

export const HintWrapper = themed.div`
    display: inline-block;
    width: 40px;
    line-height: 40px;
    text-align: center;
    
    .tool-body {
        min-width: 40px;
        height: 40px;
        padding: 0 12px;
        font-weight: 300;

        em.tool-icon {
            color: #5b97e4,
            transition: color .15s;
            vertical-align: middle;
            height: 18px;
            display: inline-block;
        }

        > span.button-label {
            margin-left: 8px;
            color: #fff;
        }

        &:hover {
            em.tool-icon {
                color: #a9ccf9;
            }
        }
    }
`;

class Hint extends React.Component<IHintProps> {
    render() {
        return (
            <HintWrapper>
                <Tooltip title={this.props.title} body={this.props.text}>
                    <div className="tool-body">
                        <em className={`tool-icon ${this.props.icon || 'icon-question'}`} />
                        {this.props.children && (<span className="button-label">{this.props.children}</span>)}
                    </div>
                </Tooltip>
            </HintWrapper>
        );
    }
}

export default Hint;
