// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import SteedosLogin from './login.js';

function mapStateToProps(state) {
    return state || {config: {EnableSignInWithEmail: true}}
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(SteedosLogin);
