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
import { injectIntl, InjectedIntlProps } from 'react-intl';
import NativeDocumentTitle from 'react-document-title';

export interface IDocumentTitleProps {
    title: string;
}

const DocumentTitle: React.SFC<IDocumentTitleProps & InjectedIntlProps> = props => {
    const title = props.title ?
        props.intl.formatMessage({
            id: 'general.title.format',
            defaultMessage: '{title} | Apla'
        }, { title: props.title }) :

        props.intl.formatMessage({
            id: 'general.title',
            defaultMessage: 'Apla'
        });

    return (
        <NativeDocumentTitle title={title}>
            {props.children}
        </NativeDocumentTitle>
    );
};

export default injectIntl(DocumentTitle);