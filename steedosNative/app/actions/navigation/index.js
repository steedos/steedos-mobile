// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import {Platform} from 'react-native';
import {Navigation} from 'react-native-navigation';
import EphemeralStore from 'app/store/ephemeral_store';

import merge from 'deepmerge';


function getThemeFromState() {

    return {
        centerChannelBg: "#ffffff"
    };
}

export function showModal(name, title, passProps = {}, options = {}) {
    // console.log('showModal', name, title ,passProps, options);
    const theme = getThemeFromState();
    const defaultOptions = {
        layout: {
            backgroundColor: theme.centerChannelBg,
        },
        statusBar: {
            visible: true,
        },
        topBar: {
            animate: true,
            visible: true,
            backButton: {
                color: theme.sidebarHeaderTextColor,
                title: '',
            },
            background: {
                color: theme.sidebarHeaderBg,
            },
            title: {
                color: theme.sidebarHeaderTextColor,
                text: title,
            },
            leftButtonColor: theme.sidebarHeaderTextColor,
            rightButtonColor: theme.sidebarHeaderTextColor,
        },
    };
    // Navigation.showModal({
    //     stack: {
    //       children: [{
    //         component: {
    //           name: name,
    //           passProps: {
    //             text: 'stack with one child'
    //           },
    //           options: {
    //             topBar: {
    //               title: {
    //                 text: 'Modal'
    //               }
    //             }
    //           }
    //         }
    //       }]
    //     }
    //   });
    Navigation.showModal({
        stack: {
            children: [{
                component: {
                    name,
                    passProps,
                    options: merge(defaultOptions, options),
                },
            }],
        },
    });
}

export async function dismissModal(options = {}) {
    const componentId = options.componentId || EphemeralStore.getNavigationTopComponentId();
    try {
        await Navigation.dismissModal(componentId);
    } catch (error) {
        console.error('dismissModal', error)
        // RNN returns a promise rejection if there is no modal to
        // dismiss. We'll do nothing in this case.
    }
}

export async function dismissAllModals(options = {}) {
    try {
        await Navigation.dismissAllModals(options);
    } catch (error) {
        // RNN returns a promise rejection if there are no modals to
        // dismiss. We'll do nothing in this case.
    }
}

export function goToScreen(name, title, passProps = {}, options = {}) {
    const componentId = EphemeralStore.getNavigationTopComponentId();
    let theme = {
        // centerChannelBg: 'red',
        // sidebarHeaderTextColor: 'red',
        // sidebarHeaderBg: 'red',
        // sidebarHeaderTextColor: 'red'
    }
    const defaultOptions = {
        layout: {
            backgroundColor: theme.centerChannelBg,
        },
        topBar: {
            animate: true,
            visible: true,
            backButton: {
                color: theme.sidebarHeaderTextColor,
                title: '',
            },
            background: {
                color: theme.sidebarHeaderBg,
            },
            title: {
                color: theme.sidebarHeaderTextColor,
                text: title,
            },
        },
    };
    Navigation.push(componentId, {
        component: {
            name,
            passProps,
            options: merge(defaultOptions, options),
        },
    });
}