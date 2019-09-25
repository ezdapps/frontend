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
import { InjectedIntl } from 'react-intl';

import themed from 'components/Theme/themed';
import Header from 'containers/Modal/Header';

export interface IModalProps<P, R> {
    intl: InjectedIntl;
    params: P;
    onResult: (data: R) => void;
    onCancel: () => void;
    notify: (type: string, params: any) => void;
    children: React.ReactNode[];
}

export type TModalComponentClass<P, R> =
    React.ComponentType<IModalProps<P, R>> |
    React.SFC<IModalProps<P, R>>;

const StyledBody = themed.div`
    padding: 15px;
    min-width: 300px;
`;

const StyledFooter = themed.div`
    padding: 15px;
    background: #efefef;
    border-top: solid 1px #d0dff3;
`;

export abstract class ModalContainer<P, S = {}> extends React.Component<P, S> {
    public static Header = Header;
    public static Body = StyledBody;
    public static Footer = StyledFooter;
}

export default abstract class Modal<P, R, S = {}> extends React.Component<IModalProps<P, R>, S> {
    public static Header = Header;
    public static Body = StyledBody;
    public static Footer = StyledFooter;
}