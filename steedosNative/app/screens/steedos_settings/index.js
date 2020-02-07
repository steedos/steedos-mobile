// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import {connect} from 'react-redux';
import Settings from './settings';
import { viewStateSelector } from '../../selectors'
import { makeNewID } from '../../utils'
import { loadApps } from '../../actions'

function mapStateToProps() {
    return (state, ownProps) => {
        ownProps.id = ownProps.id || makeNewID(ownProps)
        let entityState = viewStateSelector(state, ownProps.id) || {}
        return Object.assign({}, entityState, {...entityState, ...ownProps, accounts: state.accounts});
    };
}

function mapDispatchToProps(dispatch) {
    return ({
        loadApps: (options) => {
            dispatch(loadApps(options))
        }
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
