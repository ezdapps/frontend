/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';

export default class extends React.Component {
    render() {
        return (
            <div className="preloader">
                <div className="content">
                    <div className="loader" />
                    <div className="version">
                        {process.env.REACT_APP_VERSION}
                    </div>
                </div>
            </div>
        );
    }
}
