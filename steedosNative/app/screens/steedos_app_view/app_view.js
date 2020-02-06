// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {PureComponent} from 'react';
import {
    View,Text, StyleSheet
} from 'react-native';
import { WebView } from 'react-native-webview';
import {intlShape, injectIntl} from 'react-intl';
import {Navigation} from 'react-native-navigation';
import { dismissModal } from 'app/actions/navigation'

import { getUserId,getAuthToken } from '../../utils/accounts'

class WebLoadingView extends PureComponent {

    render() {
        return (
            <View style={{flex:1,justifyContent:'center',
        alignItems:'center'}}>
                <Text style={styles.loadingText}>
                    正在加载...
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loadingText: {
        color: '#8a8a8a',
        fontSize: 16
    }
})

class AppView extends PureComponent {

    constructor(props) {
    　　super(props)
    　　this.state = {
    　　　　isLoading: false,
    　　}
    }

    async componentWillMount(){
        this.userId = await getUserId()
        console.log('this.userId', this.userId);
        this.token = await getAuthToken();
        this.setState({isLoading: true})
    }
    
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
        let {isLoading} = this.state

        if(!isLoading){
            return (<></>)
        }

        const { app } = this.props
        let uri = `http://192.168.3.2:5000/api/setup/sso/${app?._id}?X-User-Id=${this.userId}&X-Auth-Token=${this.token}`
        console.log('app view uri', uri);
        return (
            <WebView 
                    source={{ uri }}
                    startInLoadingState = {true}
                    renderLoading = {()=>{return <WebLoadingView/>}}
                />
        );
    }
}

export default injectIntl(AppView);
