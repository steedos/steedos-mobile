// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {PureComponent} from 'react';
import {
    View,Text,FlatList,TouchableOpacity
} from 'react-native';
import {intlShape, injectIntl} from 'react-intl';
import {Navigation} from 'react-native-navigation';
import { dismissModal, showModal } from 'app/actions/navigation'
class Settings extends PureComponent {
    componentDidMount() {
        this.navigationEventListener = Navigation.events().bindComponent(this);
    }

    navigationButtonPressed({buttonId}) {
        console.log('navigationButtonPressed', buttonId);
        if (buttonId === 'close-settings') {
            dismissModal();
        }
    }

    _onPress(){
        console.log('open webview...');
        const modalOptions = {
            topBar: {
                leftButtons: [{
                    id: 'close-app-view',
                    text: "close",
                }],
            },
        };
        showModal("SteedosAppView", '审批王', {}, modalOptions);
    }

    render() {
        return (
            <View >
                <FlatList
                    data={[{key: '审批王'}, {key: '合同管理'}]}
                    renderItem={({item}) => <TouchableOpacity onPress={this._onPress}>
                    <View style={{width: 50,height: 50}}>
                      <Text>
                        {item.key}
                      </Text>
                    </View>
                  </TouchableOpacity>}
                />
      
            </View>
        );
    }
}

export default injectIntl(Settings);
