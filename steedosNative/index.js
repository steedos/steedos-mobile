/**
 * @format
 */

import App from './App';
import {Provider} from 'react-redux';
import {registerScreens} from './app/screens';
import {Navigation} from 'react-native-navigation';
import store from 'app/store';
import EphemeralStore from 'app/store/ephemeral_store';
Navigation.registerComponent(`steedosNative`, () => App);
Navigation.events().registerAppLaunchedListener(() => {
    // console.log('registerAppLaunchedListener store', store);
    registerScreens(store, Provider);
    // Navigation.setRoot({
    //     root: {
    //         component: {
    //         name: 'steedosNative'
    //         }
    //     }
    // });
    let passProps = {}
    let theme = {}
    Navigation.setRoot({
        root: {
            stack: {
                children: [{
                    component: {
                        name: 'steedosNative',
                        passProps,
                        options: {
                            layout: {
                                backgroundColor: 'transparent',
                            },
                            statusBar: {
                                visible: true,
                            },
                            topBar: {
                                visible: false,
                                height: 0,
                                backButton: {
                                    color: theme.sidebarHeaderTextColor,
                                    title: '',
                                },
                                background: {
                                    color: theme.sidebarHeaderBg,
                                },
                                title: {
                                    color: theme.sidebarHeaderTextColor,
                                },
                            },
                        },
                    },
                }],
            },
        },
    });

    Navigation.events().registerComponentDidAppearListener(({componentId}) => {
        EphemeralStore.addNavigationComponentId(componentId);
    });

    Navigation.events().registerComponentDidDisappearListener(({componentId}) => {
        EphemeralStore.removeNavigationComponentId(componentId);
    });
  });
