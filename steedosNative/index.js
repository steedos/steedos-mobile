/**
 * @format
 */

import App from './App';
import { Provider } from 'react-redux';
import { registerScreens } from './app/screens';
import { Navigation } from 'react-native-navigation';
import store from './app/store';
import EphemeralStore from 'app/store/ephemeral_store';
import { changeSteedosService } from './app/actions/settings'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {showModal} from 'app/actions/navigation';
import { dataServicesSelector } from './app/selectors'

export default function steedosInit(steedosService, inMatterMost) {
    if (steedosService) {
        store.dispatch(changeSteedosService(steedosService))
    }
    if (inMatterMost) {
        registerScreens(store, Provider);
    } else {
        Navigation.registerComponent(`steedosNative`, () => App);
        Navigation.events().registerAppLaunchedListener(() => {
            registerScreens(store, Provider);
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

            Navigation.events().registerComponentDidAppearListener(({ componentId }) => {
                EphemeralStore.addNavigationComponentId(componentId);
            });

            Navigation.events().registerComponentDidDisappearListener(({ componentId }) => {
                EphemeralStore.removeNavigationComponentId(componentId);
            });
        });
    }

}


export async function showSteedosSettings(options){
    let closeButton = await MaterialIcon.getImageSource('close', 20, "#ffffff")
    let moreButton = await MaterialIcon.getImageSource('settings', 20, "#ffffff")
    const modalOptions = {
        topBar: {
            leftButtons: [{
                id: 'close-settings',
                icon: closeButton,
            }],
            rightButtons: [{
                id: 'open-more',
                icon: moreButton,
            }]
        },
    };
    showModal("SteedosSettings", '工作台', {openMore: options.openSettings}, modalOptions);
}

export function hasSteedosApps(){
    return dataServicesSelector(store.getState())
}

export function canShowSteedosSettings(props){
    return 'right' === props.drawerPosition && hasSteedosApps()
}

export function getSettingsIcon(){
    if(hasSteedosApps()){
        return 'md-apps'
    }
    return 'md-more'
}

// steedosInit("local service")