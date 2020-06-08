// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {PureComponent} from 'react';
import {
    View,Text, StyleSheet
} from 'react-native';
import { WebView } from 'react-native-webview';
import {intlShape, injectIntl} from 'react-intl';
import {Navigation} from 'react-native-navigation';
import { dismissModal, dismissAllModals } from 'app/actions/navigation'
import WebLoadingView from '../../components/web_loading'
import { getUserId,getAuthToken } from '../../utils/accounts'

class SteedosWebView extends PureComponent {

    constructor(props) {
    　　super(props)
    　　this.state = {
    　　　　isLoading: true,
    　　}
    }

    // async UNSAFE_componentWillMount(){
    //     this.userId = await getUserId()
    //     this.token = await getAuthToken();
    //     this.setState({isLoading: true})
    // }
    
    componentDidMount() {
        this.navigationEventListener = Navigation.events().bindComponent(this);
    }

    navigationButtonPressed({buttonId}) {
        if (buttonId === 'close-web-view') {
            dismissModal();
        }else if(buttonId === 'open-more'){
            dismissAllModals();
            const { openSettings } = this.props
            openSettings({openSettingsDrawer: true})
        }
    }

    render() {
        let {isLoading} = this.state
        let { service } = this.props
        if(!isLoading){
            return (<></>)
        }
        let uri = `${service}`
        return (
            <WebView 
                    source={{ uri }}
                    startInLoadingState = {true}
                    renderLoading = {()=>{return <WebLoadingView/>}}
                />
        );
    }
}

export default injectIntl(SteedosWebView);
