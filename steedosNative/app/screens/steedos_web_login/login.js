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
import CookieManager from '@react-native-community/cookies';
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

    render() {
        let { service, saveAccounts } = this.props
        loadingEnded = ()=>{
            let {loadingEndedCount} =  this.state
            CookieManager.get(service, true)
            .then(async (res, err) => {
                if(loadingEndedCount > 0 ){
                    console.log('res', JSON.stringify(res));
                    saveAccounts({cookies: res});
                    dismissModal();
                }else{
                    saveAccounts({cookies: {}})
                }
                loadingEndedCount++;
                this.setState({loadingEndedCount})
            });
        }

        return (
            <WebView
        source={{ uri: `${service}/accounts/a/login` }}
        onLoadEnd = {loadingEnded}
        sharedCookiesEnabled={true}
      />
        );
    }
}

export default injectIntl(WebLoginView);
