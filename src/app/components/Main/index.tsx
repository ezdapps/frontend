/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import { Redirect } from 'react-router';
import { routes } from 'lib/routing';

import themed from 'components/Theme/themed';
import media from 'components/Theme/media';
import Window from 'components/Window';

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
    grid-template-rows: max-content 1fr;
    grid-template-columns: minmax(auto, 100vw);
    grid-template-areas:
        'header'
        'content';
    justify-content: stretch;
    align-content: stretch;
    overflow: hidden;

    > .layout__header {
        grid-area: header;
        z-index: 5;
    }

    > .layout__content {
        z-index: 4;
        grid-area: content;
        overflow: hidden;
    }


    @media (${media.md}) {
        > .layout__header {
            box-shadow: rgba(0,0,0,0.4) 0 2px 5px;
        }
    }
`;

const Main: React.SFC<Props> = props => {
    const Route = routes[props.app];
    const headerProps =
        Route && Route.mapHeaderParams ? Route.mapHeaderParams(props) : props;
    const contentProps =
        Route && Route.mapContentParams ? Route.mapContentParams(props) : props;

    return Route ? (
        true ? (
            <Window
                type="fullscreen"
                header={<Route.Header {...headerProps} />}
            >
                <Route.Content {...contentProps} />
            </Window>
        ) : (
            <StyledLayout>
                <div className="layout__header">
                    <Route.Header {...headerProps} />
                </div>

                <div className="layout__content">
                    <Route.Content {...contentProps} />
                </div>
            </StyledLayout>
        )
    ) : (
        <Redirect to="/browse" />
    );
};

export default Main;
