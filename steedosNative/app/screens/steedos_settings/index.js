// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import {connect} from 'react-redux';
import Settings from './settings';
import { getApps } from '../../selectors'

import { loadBootstrapEntitiesData } from '../../actions'

function mapStateToProps(state) {
    console.log('mapStateToProps', state);
    const apps = getApps(state);
    return Object.assign({}, {apps});
}

function mapDispatchToProps(dispatch) {
    return ({
        loadBootstrap: (options) => {
            console.log('mapDispatchToProps loadBootstrap...');
            dispatch(loadBootstrapEntitiesData(options))
        }
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
