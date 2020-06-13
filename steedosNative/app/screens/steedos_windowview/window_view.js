// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {PureComponent} from 'react';
import { WebView } from 'react-native-webview';
import {intlShape, injectIntl} from 'react-intl';
import {Navigation} from 'react-native-navigation';
import { dismissModal } from 'app/actions/navigation'
import WebLoadingView from '../../components/web_loading'

class SteedosWindowView extends PureComponent {

    constructor(props) {
    　　super(props)
    　　this.state = {
    　　　　isLoading: true,
    　　}
    }

    componentDidMount() {
        this.navigationEventListener = Navigation.events().bindComponent(this);
    }

    navigationButtonPressed({buttonId}) {
        if (buttonId === 'close-window-view') {
            dismissModal();
        }
    }

    setTitle(title){
        const {componentId}=this.props
        Navigation.mergeOptions(componentId, {topBar: {title: {text: title}}})
    }

    

    render() {
        let {isLoading} = this.state
        let { url } = this.props

        const setWindowTitle = `
            setInterval(function(){
                window.ReactNativeWebView.postMessage(JSON.stringify({"windowTitle": document.title}))
            }, 500)
        `;

        if(!isLoading){
            return (<></>)
        }
        return (
            <WebView 
                    source={{ url }}
                    startInLoadingState = {true}
                    renderLoading = {()=>{return <WebLoadingView/>}}
                    // injectedJavaScript={setWindowTitle}
                    // onMessage={event => {
                    //     if(event.nativeEvent.data){
                    //         let data = JSON.parse(event.nativeEvent.data);
                    //         if(data.windowTitle){
                    //             this.setTitle(data.windowTitle)
                    //         }
                    //     }
                    // }}
                />
        );
    }
}

export default injectIntl(SteedosWindowView);
