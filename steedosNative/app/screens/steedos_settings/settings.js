// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {PureComponent} from 'react';
import {
    View,Text,FlatList,TouchableOpacity,StyleSheet,Dimensions
} from 'react-native';
import {intlShape, injectIntl} from 'react-intl';
import {Navigation} from 'react-native-navigation';
import { dismissModal, showModal, goToScreen } from 'app/actions/navigation'
import AsyncStorage from '@react-native-community/async-storage';
import _ from 'underscore'
import Icon from 'react-native-vector-icons/Ionicons';
const {width, height} = Dimensions.get('window')
const cols = 4;
const cellWH = (width)/cols;

class Settings extends PureComponent {

    showWebLogin = ()=>{
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


    initData = (showLogin)=>{
        const { accounts } = this.props;
        if(_.isEmpty(accounts?.cookies) && showLogin){
            this.showWebLogin(); 
        }else{
            const { loadApps, isLoaded } = this.props;
            if(!isLoaded){
                loadApps(Object.assign({}, this.props))
            }
        }
    }

    async componentDidMount() {
        this.navigationEventListener = Navigation.events().bindComponent(this);
        this.initData(true);
    }

    async componentDidUpdate(){
        this.initData();
    }

    navigationButtonPressed({buttonId}) {
        if (buttonId === 'close-settings') {
            dismissModal();
        }
    }

    _onPress(app){
        goToScreen("SteedosAppView", app.name, {app})
    }

    render() {
        //TODO： 根据creator中Apps的显示规则封装getApps函数。
        const {rows:apps} = this.props
        let data = [];
        sortedApps = _.sortBy(_.values(apps), 'sort')
        _.each(sortedApps, (app)=>{      
            if(app.is_creator != false && app._id != "admin" && app.mobile){
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
                    <Icon name={item.icon.replace('ion-', '').replace('-outline', '')} style={styles.icon}/>
                      <Text style={{marginTop: 5, textAlign: 'center'}} numberOfLines={1}>
                        {item.key} 
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
        paddingVertical: 15,
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
        height: cellWH,
        marginTop: 1,
        alignItems: 'center',
    },
    icon: {
        fontSize: 36,
        color: '#00ACC1'
    }
  })

export default injectIntl(Settings);
