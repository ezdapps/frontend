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
import { FormattedMessage } from 'react-intl';

import LocalizedDocumentTitle from 'components/DocumentTitle/LocalizedDocumentTitle';
import Center from 'components/Center';

export interface IErrorProps {
    error: string;
}

const Error: React.SFC<IErrorProps> = (props) => (
    <LocalizedDocumentTitle title="general.error" defaultTitle="Error">
        <Center>
            <div className="text-muted">
                <div className="text-center mb-xl">
                    <div className="text-lg mb-lg">500</div>
                    <p className="lead m0">
                        <FormattedMessage id="general.error" defaultMessage="Error" />
                    </p>
                    <div>
                        <div>
                            <FormattedMessage id="general.error.page" defaultMessage="The page you are looking for could not be processed" />
                        </div>
                        <div>{props.error}</div>
                    </div>
                </div>
            </div>
        </Center>
    </LocalizedDocumentTitle>
);

export default Error;