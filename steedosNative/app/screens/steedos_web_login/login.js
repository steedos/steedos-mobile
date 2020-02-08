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
import CookieManager from 'react-native-cookies';
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

    componentWillUnmount(){
        if(this.setIntervalId){
            clearInterval(this.setIntervalId);
        }
    }

    render() {
        let { service, saveAccounts } = this.props
        let loadingEnded = ()=>{
            this.setIntervalId = setInterval(() => {
                CookieManager.get(service, true)
                .then(async (res) => {
                    if(!_.isEmpty(res)){
                        saveAccounts({cookies: res});
                        dismissModal();
                        clearInterval(this.setIntervalId);
                    }
                });
            }, 300);
        }

        return (
            <WebView
                source={{ uri: `${service}/accounts/a/login` }}
                onLoadEnd={loadingEnded}
                sharedCookiesEnabled={true}
                startInLoadingState={true}
                renderLoading={() => { return <WebLoadingView /> }}
            />
        );
    }
}

export default injectIntl(WebLoginView);
