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

import { IParamsSpec } from '../Protypo';
import StyledComponent from './StyledComponent';
import PageLink from 'containers/Routing/PageLink';

export interface ILinkPageProps {
    'class'?: string;
    'className'?: string;
    'page'?: string;
    'pageparams'?: IParamsSpec;
}

interface ILinkPageContext {
    section: string;
    getFromContext: () => any;
    protypo: any;
}

const LinkPage: React.SFC<ILinkPageProps> = (props, context: ILinkPageContext) => (
    <PageLink
        className={[props.class, props.className].join(' ')}
        section={context.section}
        page={props.page || ''}
        params={props.pageparams ? context.protypo.resolveParams(props.pageparams) : {}}
        from={context.protypo.getFromContext(props.children)}
    >
        {props.children}
    </PageLink>
);

LinkPage.contextTypes = {
    protypo: propTypes.object.isRequired,
    section: propTypes.string.isRequired
};

export default StyledComponent(LinkPage);