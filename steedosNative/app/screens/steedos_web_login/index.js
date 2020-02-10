// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import {connect} from 'react-redux';
import WebLoginView from './login';
import { saveAccounts } from '../../actions'
import { dataServicesSelector } from '../../selectors'
function mapStateToProps() {
    return (state, ownProps) => {
        let service = dataServicesSelector(state)
        return {service};
    };
}

function mapDispatchToProps(dispatch) {
    return ({
        saveAccounts: (options) => {
            dispatch(saveAccounts(options))
        }
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(WebLoginView);
