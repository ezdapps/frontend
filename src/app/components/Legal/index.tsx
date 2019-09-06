/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *---------------------------------------------------------------------------------------------*/

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
