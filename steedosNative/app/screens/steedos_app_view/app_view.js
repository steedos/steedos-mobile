// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {PureComponent} from 'react';
import {
    View,Text
} from 'react-native';
import { WebView } from 'react-native-webview';
import {intlShape, injectIntl} from 'react-intl';
import {Navigation} from 'react-native-navigation';
import { dismissModal } from 'app/actions/navigation'
class AppView extends PureComponent {
    componentDidMount() {
        this.navigationEventListener = Navigation.events().bindComponent(this);
    }

    navigationButtonPressed({buttonId}) {
        console.log('navigationButtonPressed', buttonId);
        if (buttonId === 'close-app-view') {
            dismissModal();
        }
    }

    _onPress(){
        console.log('open webview...');
    }

    render() {
        const { app } = this.props
        let uri = `http://192.168.3.2:5000/app/${app._id}`
        console.log('app view uri', uri);
        return (
            <WebView
        source={{ uri }}
      />
        );
    }
}

export default injectIntl(AppView);
