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
import TxInfo from 'containers/StaticPages/TxInfo';

export interface IStaticPage<T = {}, TSubParams = {}> {
    renderSubstitute?: (props?: T) => {
        name: string;
        params: TSubParams;
    };
    render: (section: string, props?: T) => React.ReactNode;
}

const STATIC_PAGES: { [page: string]: IStaticPage<any, any> } = {
    'txinfo': {
        renderSubstitute: props => ({
            name: props.page,
            params: {
                txhashes: props.txhashes
            }
        }),
        render: (section, props) => <TxInfo section={section} {...props} />
    }
};

export {
    STATIC_PAGES
};