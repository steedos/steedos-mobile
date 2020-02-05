// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {PureComponent} from 'react';
import {
    View,Text,FlatList,TouchableOpacity,StyleSheet,Dimensions
} from 'react-native';
import {intlShape, injectIntl} from 'react-intl';
import {Navigation} from 'react-native-navigation';
import { dismissModal, showModal } from 'app/actions/navigation'
import AsyncStorage from '@react-native-community/async-storage';
import _ from 'underscore'
import Svg, { SvgUri, SvgCssUri, Use,Image } from 'react-native-svg';

const {width, height} = Dimensions.get('window')
const cols = 4;
const cellWH = (width)/cols;

class Settings extends PureComponent {

    showWebLogin = ()=>{
        console.log('showWebLogin...');
        const modalOptions = {
            topBar: {
                leftButtons: [{
                    id: 'close-web-login',
                    text: "close",
                }],
            },
        };
        showModal("SteedosWebViewLogin", 'web登录', {}, modalOptions);
        return ;
      }

    async componentDidMount() {
        this.navigationEventListener = Navigation.events().bindComponent(this);
        const steedosCookies = await AsyncStorage.getItem('STEEDOS_COOKIES');
        const steedosCookiesMap = JSON.parse(steedosCookies);
        console.log('steedosCookies', steedosCookies);
        console.log(11111111, _.isEmpty(steedosCookiesMap))
        if(_.isEmpty(steedosCookiesMap)){
            showWebLogin();
        }else{
            const { loadBootstrap, isBootstrapLoaded, isRequestStarted } = this.props;
            loadBootstrap({spaceId: "55090bbe527eca33d8000fe0"})
        }
    }

    navigationButtonPressed({buttonId}) {
        console.log('navigationButtonPressed', buttonId);
        if (buttonId === 'close-settings') {
            dismissModal();
        }
    }

    _onPress(app){
        console.log('open webview...', app);
        const modalOptions = {
            topBar: {
                leftButtons: [{
                    id: 'close-app-view',
                    text: "close",
                }],
            },
        };
        showModal("SteedosAppView", app.name, {app}, modalOptions);
    }

    render() {

        //TODO： 根据creator中Apps的显示规则封装getApps函数。
        const {apps} = this.props
        console.log('apps', apps);
        let data = [];
        sortedApps = _.sortBy(_.values(apps), 'sort')
        _.each(sortedApps, (app)=>{      
            if(app.is_creator != false && app._id != "admin"){
                data.push({...app, key: app.name})
            }
        })

        return (
            <View style={styles.container}>
                <FlatList
                    data={data}
                    numColumns ={cols}
                    contentContainerStyle={styles.list_container}
                    renderItem={({item}) => <TouchableOpacity onPress={()=> this._onPress(item)} activeOpacity={0.5}>
                    <View style={styles.item}>
                        <Svg width="130"
  height="130"
  fill="blue"
  stroke="red"
  color="green" >
                            <Image href={{uri: 'http://192.168.3.2:5000/assets/icons/standard-sprite/svg/symbols.svg#approval'}} />
                        </Svg>
                        
                          {/* <SvgCssUri
    style={{width: cellWH,height:cellWH, borderRadius: 5}}
    uri="http://thenewcode.com/assets/svg/accessibility.svg"
  /> */}
                      <Text style={{marginTop: 5, textAlign: 'center'}} numberOfLines={1}>
                        {item.key}1122
                      </Text>
                    </View>
                  </TouchableOpacity>}
                />
      
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        // paddingVertical: 15,
    },
    list_container: {
        // 主轴方向
        // flexDirection:'row',
        justifyContent: 'space-between',
        // 一行显示不下,换一行
        // flexWrap:'wrap',
        // 侧轴方向
        // alignItems:'center', // 必须设置,否则换行不起作用
        // paddingHorizontal: 20,
    },
    item: {
        width:cellWH,
        marginTop: 1,
        alignItems: 'center',
    }
  })

export default injectIntl(Settings);
