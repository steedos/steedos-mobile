// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {PureComponent} from 'react';
import {
    View,Text
} from 'react-native';
import {intlShape, injectIntl} from 'react-intl';
import {Navigation} from 'react-native-navigation';
import { dismissModal } from 'app/actions/navigation'
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

    render() {
        return (
            <View >
                <Text>Steedos Settings</Text>
            </View>
        );
    }
}

export default injectIntl(Settings);
