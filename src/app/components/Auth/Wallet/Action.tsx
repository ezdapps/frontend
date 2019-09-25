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
import styled from 'styled-components';
import classNames from 'classnames';
import { Button, Clearfix } from 'react-bootstrap';

export interface IAction {
    className?: string;
    icon: string;
    title: React.ReactNode;
    description: React.ReactNode;
    action: React.ReactNode;
    onClick: () => void;
}

const Action: React.SFC<IAction> = (props) => (
    <Clearfix componentClass="div" className={props.className}>
        <div className="action-icon">
            <em className={classNames('text-primary', props.icon)} />
        </div>
        <h4>
            {props.title}
        </h4>
        <div>
            {props.description}
        </div>
        <div className="text-right">
            <Button bsStyle="link" onClick={props.onClick}>
                {props.action}
            </Button>
        </div>
    </Clearfix>
);

export default styled(Action)`
    .action-icon {
        float: left;
        width: 100px;
        font-size: 46px;
        vertical-align: top;
        text-align: center;
        padding: 10px;
        margin-right: 10px;
    }
`;