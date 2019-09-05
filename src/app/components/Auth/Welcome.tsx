/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import { FormattedMessage } from 'react-intl';
import themed from 'components/Theme/themed';

interface Props {
    className?: string;
}

const Welcome: React.SFC<Props> = props => (
    <div className={props.className}>
        <h4 className="p0 m0">
            <FormattedMessage id="auth.welcome" defaultMessage="Welcome" />
        </h4>
        <p className="pv">
            <FormattedMessage
                id="auth.welcome.guide"
                defaultMessage="Before proceeding, you will be guided through the account creation process. This will not take too much time"
            />
        </p>
    </div>
);

export default themed(Welcome)`
    height: 100%;
    text-align: center;
    padding: 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
