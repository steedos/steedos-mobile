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
import CookieManager from '@react-native-community/cookies';
import AsyncStorage from '@react-native-community/async-storage';
class WebLoginView extends PureComponent {
    componentDidMount() {
        this.navigationEventListener = Navigation.events().bindComponent(this);
    }

    navigationButtonPressed({buttonId}) {
        console.log('navigationButtonPressed', buttonId);
        if (buttonId === 'close-web-login') {
            dismissModal();
        }
    }

    _onPress(){
        console.log('open webview...');
    }

    render() {
        
        loadingEnded = (a,b,c,d,e,f)=>{
            CookieManager.get('http://192.168.3.2', true)
            .then(async (res, err) => {
                AsyncStorage.setItem("STEEDOS_COOKIES", JSON.stringify(res));
            });
        }

        return (
            <WebView
        source={{ uri: 'http://192.168.3.2:5000' }}
        onLoadEnd = {loadingEnded}
        sharedCookiesEnabled={true}
      />
        );
    }
}

export default injectIntl(WebLoginView);
