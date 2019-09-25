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
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';

interface Props {
    className?: string;
}

const Legal: React.SFC<Props & InjectedIntlProps> = props => (
    <div className={props.className}>
        <FormattedMessage id="legal.copy" defaultMessage="Powered by" />
        <a
            target="_blank"
            rel="noopener noreferrer"
            href={props.intl.formatMessage({
                id: 'legal.homepage',
                defaultMessage: 'https://apla.io'
            })}
        >
            &nbsp;
            <FormattedMessage id="legal.homepage.title" defaultMessage="Apla" />
        </a>
    </div>
);

export default themed(injectIntl(Legal))`
    font-size: 15px;
    padding: 15px;
    color: #fff;
    text-shadow: rgba(0, 0, 0, 0.2) 0 0 10px;
`;
