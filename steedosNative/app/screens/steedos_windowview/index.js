// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import {connect} from 'react-redux';
import SteedosWindowView from './window_view';
import { dataServicesSelector } from '../../selectors'
function mapStateToProps() {
    return (state, ownProps) => {
        let service = dataServicesSelector(state)
        return {service};
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps)(SteedosWindowView);
