/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { modalShow } from 'modules/modal/actions';

import Auth from 'components/Auth';

const selectNetwork = (state: IRootState) => {
    const session = state.engine.guestSession;
    if (!session) {
        return undefined;
    }

    return state.storage.networks.find(l => l.uuid === session.network.uuid);
};

const selectActivationMail = (state: IRootState) => {
    const network = selectNetwork(state);
    return network ? network.activationEmail : '';
};

const mapStateToProps = (state: IRootState) => ({
    activationEmail: selectActivationMail(state)
});

const mapDispatchToProps = {
    onCreate: () =>
        modalShow({
            id: 'CREATE_ACCOUNT',
            type: 'AUTH_CREATE_ACCOUNT',
            params: {}
        })
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    (state, dispatch: any, props) => ({
        ...props,
        activationEnabled: !!state.activationEmail,
        onCreate: dispatch.onCreate
    })
)(Auth);
