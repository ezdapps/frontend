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

import themed from 'components/Theme/themed';
import BackButton from './BackButton';

export interface IHeadingOption {
    icon: string;
    title: string;
    navigateUrl: string;
}

export interface IHeadingProps {
    className?: string;
    returnUrl?: string;
    onReturn?: () => void;
    option: React.ReactNode;
}

const Heading: React.SFC<IHeadingProps> = props => (
    <div className={props.className}>
        <div className="heading-content">
            <div className="heading-left">
                {(props.returnUrl || props.onReturn) && (
                    <BackButton returnUrl={props.returnUrl} onClick={props.onReturn} />
                )}
            </div>
            <div className="heading-title">
                {props.children}
            </div>
            {props.option && (
                <div className="heading-right">
                    {props.option}
                </div>
            )}
        </div>
    </div>
);

export default themed(Heading)`
    background: ${props => props.theme.headerBackground};
    margin: -15px -15px 15px;
    padding: 0 15px;
    height: 45px;
    line-height: 43px;

    .heading-content {
        position: relative;

        .heading-left {
            position: absolute;
            top: 2px;
            left: 0;
            bottom: 0;
        }

        .heading-right {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
        }

        .heading-title {
            color: ${props => props.theme.headerForeground};
            font-size: 18px;
        }
    }
`;