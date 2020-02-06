// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import {connect} from 'react-redux';
import WebLoginView from './login';
import { saveAccounts } from '../../actions'
function mapStateToProps(state) {
    console.log('mapStateToProps', state);
    return state || {};
}

function mapDispatchToProps(dispatch) {
    return ({
        saveAccounts: (options) => {
            console.log('mapDispatchToProps saveAccounts...');
            dispatch(saveAccounts(options))
        }
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(WebLoginView);
