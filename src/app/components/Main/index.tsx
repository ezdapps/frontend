/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';

import themed from 'components/Theme/themed';
import Navigator from 'containers/Main/Navigator';
import Header from 'containers/Main/Header';

interface Props {
}

const StyledLayout = themed.main`
    position: relative;
    padding-top: ${props => props.theme.menubarSize}px;
    display: flex;
    flex: 1;
    flex-direction: column;
`;

const Main: React.SFC<Props> = props => (
    <StyledLayout>
        <Header />
        <Switch>
            <Route
                path="/browse/:section?/:page?"
                render={route => <Navigator section={route.match.params.section} page={route.match.params.page} />}
            />
            <Redirect to="/browse" />
        </Switch>
    </StyledLayout>
);

export default Main;