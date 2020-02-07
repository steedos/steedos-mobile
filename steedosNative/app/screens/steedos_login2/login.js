// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {PureComponent} from 'react';
import {
    View,Text
} from 'react-native';
import { WebView } from 'react-native-webview';
import {intlShape, injectIntl} from 'react-intl';
import {Navigation} from 'react-native-navigation';
import { dismissModal, showModal, dismissModalAll  } from 'app/actions/navigation'
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
    showApps = ()=>{
        // Alert.alert('Button with adjusted color pressed')
        console.log('showApps...');
        const modalOptions = {
            topBar: {
                leftButtons: [{
                    id: 'close-settings',
                    text: "关闭",
                }],
            },
        };
        showModal("SteedosSettings", '工作台', {}, modalOptions);
        return ;
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
        let { saveAccounts } = this.props
        loadingEnded = (a,b,c,d,e,f)=>{

            let {loadingEndedCount} =  this.state
            CookieManager.get('http://192.168.3.2', true)
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
        source={{ uri: 'http://192.168.3.2:5000/accounts/a/login' }}
        onLoadEnd = {loadingEnded}
        sharedCookiesEnabled={true}
      />
        );
    }
}

export default injectIntl(WebLoginView);
