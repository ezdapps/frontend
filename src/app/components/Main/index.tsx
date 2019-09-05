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
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow: hidden;
    height: 100%;
`;

const Main: React.SFC<Props> = props => {
    const Route = routes[props.app];
    const headerProps = (Route && Route.mapHeaderParams) ? Route.mapHeaderParams(props) : props;
    const contentProps = (Route && Route.mapContentParams) ? Route.mapContentParams(props) : props;

    return (
        <StyledLayout>
            {Route ?
                (

                    <>
                        <Route.Header {...headerProps} />
                        <Route.Content {...contentProps} />
                    </>
                )
                :
                (
                    <Redirect to="/browse" />
                )
            }
        </StyledLayout>
    );
};

export default Main;