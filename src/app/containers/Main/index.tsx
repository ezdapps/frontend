/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { IRootState } from 'modules';

import Main, { IMainProps } from 'components/Main';
import NotFound from 'components/NotFound';
import Sections from './Sections';

const MainContainer: React.SFC<IMainProps> = props => (
    <Main {...props}>
        <Switch>
            <Route exact path="/:section/:page?" render={route => <Sections section={route.match.params.section} page={route.match.params.page} />} />
            <Route path="*" render={() => <NotFound main />} />
        </Switch>
    </Main>
);

const mapStateToProps = (state: IRootState) => ({
    isAuthorized: !!state.auth.privateKey,
    stylesheet: state.content.stylesheet,
    sections: state.sections.sections,
    // navigationVisible: state.sections.sections[state.sections.section] &&
    //     (state.sections.sections[state.sections.section].menuDisabled ?
    //         false :
    //         state.sections.sections[state.sections.section].menuVisible
    //     ),
    transactionsCount: state.tx.transactions.count()
});

export default connect(mapStateToProps, {})(MainContainer);