// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import {connect} from 'react-redux';
import AppView from './app_view';
function mapStateToProps(state) {
    return state || {};
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps)(AppView);