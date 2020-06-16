// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {PureComponent} from 'react';
import {
    Alert,
    Platform,
    StyleSheet,
    View,
} from 'react-native';
import { WebView } from 'react-native-webview';
import {intlShape, injectIntl} from 'react-intl';
import {Navigation} from 'react-native-navigation';
import { dismissModal, dismissAllModals } from 'app/actions/navigation'
import FormattedText from 'app/components/formatted_text';
import WebLoadingView from '../../components/web_loading'
import {windowOpen} from '../../../index'
import {downloadAndPreviewFile} from '../../utils/index'
import {changeOpacity} from 'app/utils/theme';
class SteedosWebView extends PureComponent {

    constructor(props) {
    　　super(props)
    　　this.state = {
    　　　　isLoading: true,
           downloading: false
    　　}
    }

    static contextTypes = {
        intl: intlShape,
    };

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

    setTitle(title){
        const {componentId}=this.props
        Navigation.mergeOptions(componentId, {topBar: {title: {text: title}}})
    }

    render() {
        let {isLoading, downloading} = this.state
        let { service } = this.props
        if(!isLoading){
            return (<></>)
        }
        let uri = `${service}`

        const overrideWindowOpen = `
            window.open = function(url){
                let prefix = '';
                if(window.__meteor_runtime_config__ && window.__meteor_runtime_config__.ROOT_URL_PATH_PREFIX){
                    prefix = window.__meteor_runtime_config__.ROOT_URL_PATH_PREFIX
                }
                if(url && !url.startsWith('http:') && !url.startsWith('http:')){
                    if(url.startsWith('/')){
                        url = window.location.origin + prefix + url
                    }else{
                        url = window.location.origin + prefix + '/' + url
                    }
                }
                window.ReactNativeWebView.postMessage(JSON.stringify({windowOpen: {url: url}}))
            }

            if(!window.SteedosBrower){
                window.SteedosBrower = {};
            }

            //file: {url:'', caption:'', data: {id: '', name: '', extension: ''}}
            window.SteedosBrower.downloadAndPreviewFile = function(file){
                window.ReactNativeWebView.postMessage(JSON.stringify({downloadAndPreviewFile: {file: file}}))
            }

            window.SteedosBrower.setWindowTitle = function(title){
                window.ReactNativeWebView.postMessage(JSON.stringify({setWindowTitle: {title: title}}))
            }
        `;
        return (
            <View style={{flex: 1}}>
                <WebView 
                    source={{ uri }}
                    startInLoadingState = {true}
                    renderLoading = {()=>{return <WebLoadingView/>}}
                    injectedJavaScript={overrideWindowOpen}
                    onMessage={async (event) => {
                        if(event.nativeEvent.data){
                            let data = JSON.parse(event.nativeEvent.data);
                            if(data.windowOpen && data.windowOpen.url){
                                if(data.windowOpen.url.indexOf('/api/files') > -1){
                                    let _data = data.windowOpen.url.split('/');
                                    let last = _data[_data.length - 1];
                                    last = last.split('?')[0];
                                    this.setState({downloading: true});
                                    await downloadAndPreviewFile({url: data.windowOpen.url, data: {id: last, name: last}}, {context: this.context})
                                    setTimeout(()=>{
                                        this.setState({downloading: false});
                                    }, 1800)
                                }else{
                                    windowOpen({title: data.windowOpen.title || '', url: data.windowOpen.url});
                                }
                            }
                            if(data.downloadAndPreviewFile && data.downloadAndPreviewFile.file){
                                this.setState({downloading: true});
                                await downloadAndPreviewFile(data.downloadAndPreviewFile.file, {context: this.context})
                                setTimeout(()=>{
                                    this.setState({downloading: false});
                                }, 1800)
                            }
                            if(data.setWindowTitle){
                                this.setTitle(data.setWindowTitle.title)
                            }
                        }
                    }}
                />
                {downloading && <View style={style.loadingContainer}>
                    <FormattedText
                        id='mobile.downloading'
                        defaultMessage='下载中...'
                        style={{color: "#ffffff"}}
                    />
                </View>}
            </View>
        );
    }
}

export default injectIntl(SteedosWebView);

const style = StyleSheet.create({
    loadingContainer: {
        zIndex: 9999,
        position: "absolute",
        backgroundColor: changeOpacity("#3d3c40", 0.4),
        alignItems: 'center',
        justifyContent: 'center',
        height: "100%",
        width: "100%"
    },
});