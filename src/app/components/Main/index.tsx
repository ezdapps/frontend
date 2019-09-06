/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import { Redirect } from 'react-router';
import { routes } from 'lib/routing';

import themed from 'components/Theme/themed';

interface Props {
    app?: string;
    page?: string;
    action?: string;
}

const StyledLayout = themed.main`
    background: ${props => props.theme.contentBackground};
    position: relative;
    display: grid;
    height: 100%;
    grid-template-rows: max-content auto;
    grid-template-columns: minmax(auto, 100vw);
    grid-template-areas:
        'header'
        'content';
    justify-content: stretch;
    align-content: stretch;
    overflow: hidden;

    > .layout__header {
        grid-area: header;
    }

    > .layout__content {
        grid-area: content;
    }
`;

const Main: React.SFC<Props> = props => {
    const Route = routes[props.app];
    const headerProps =
        Route && Route.mapHeaderParams ? Route.mapHeaderParams(props) : props;
    const contentProps =
        Route && Route.mapContentParams ? Route.mapContentParams(props) : props;

    return (
        <StyledLayout>
            {Route ? (
                <>
                    <div className="layout__header">
                        <Route.Header {...headerProps} />
                    </div>

                    <div className="layout__content">
                        <Route.Content {...contentProps} />
                    </div>
                </>
            ) : (
                <Redirect to="/browse" />
            )}
        </StyledLayout>
    );
};

export default Main;
