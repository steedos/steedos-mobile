// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {PureComponent} from 'react';
import {
    View,Text
} from 'react-native';
import { WebView } from 'react-native-webview';
import { injectIntl } from 'react-intl';
import { Navigation } from 'react-native-navigation';
import { dismissModal } from 'app/actions/navigation'
import WebLoadingView from '../../components/web_loading'
import _ from 'underscore'

class WebLoginView extends PureComponent {

    constructor(props) {
    　　super(props)
    　　this.state = {
    　　　　loadingEndedCount: 0,
    　　}
    }

    async componentDidMount() {
        this.navigationEventListener = Navigation.events().bindComponent(this);
    }
    
    navigationButtonPressed({buttonId}) {
        if (buttonId === 'close-web-login') {
            dismissModal();
        }
    }

    onMessage = (event) => {
        let accountsData = JSON.parse(event.nativeEvent.data)
        let { saveAccounts } = this.props
        saveAccounts({cookies: accountsData});
        dismissModal();
    }

    render() {
        let { service, saveAccounts } = this.props
        
        let loadingEnded = ()=>{
            // saveAccounts({cookies: {}})
        }

        return (
            <WebView
                source={{ uri: `${service}/accounts/a/login` }}
                onLoadEnd={loadingEnded}
                sharedCookiesEnabled={true}
                startInLoadingState={true}
                renderLoading={() => { return <WebLoadingView /> }}
                onMessage={this.onMessage}
            />
        );
    }
}

export default injectIntl(WebLoginView);
