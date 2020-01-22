// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import {Platform} from 'react-native';
import {Navigation} from 'react-native-navigation';

import merge from 'deepmerge';


function getThemeFromState() {

    return {
        centerChannelBg: "#ffffff"
    };
}

export function showModal(name, title, passProps = {}, options = {}) {
    console.log('showModal', name, title ,passProps, options);
    const theme = getThemeFromState();
    const defaultOptions = {
        // layout: {
        //     backgroundColor: theme.centerChannelBg,
        // },
        // statusBar: {
        //     visible: true,
        // },
        // topBar: {
        //     animate: true,
        //     visible: true,
        //     backButton: {
        //         color: theme.sidebarHeaderTextColor,
        //         title: '',
        //     },
        //     background: {
        //         color: theme.sidebarHeaderBg,
        //     },
        //     title: {
        //         color: theme.sidebarHeaderTextColor,
        //         text: title,
        //     },
        //     leftButtonColor: theme.sidebarHeaderTextColor,
        //     rightButtonColor: theme.sidebarHeaderTextColor,
        // },
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

