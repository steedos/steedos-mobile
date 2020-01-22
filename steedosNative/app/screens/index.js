import {Navigation} from 'react-native-navigation';
import React from 'react';
import {IntlProvider} from 'react-intl';
export function registerScreens(store, Provider) {
    // TODO consolidate this with app/utils/wrap_context_provider
    const wrapper = (Comp) => (props) => ( // eslint-disable-line react/display-name
        <Provider store={store}>
            <IntlProvider locale={'en'}>
            <Comp {...props}/>
            </IntlProvider>
        </Provider>
    );
    console.log("registerScreens run ....", store, require('./steedos_settings').default)
    Navigation.registerComponent('SteedosSettings', () => wrapper(require('./steedos_settings').default), () => require('./steedos_settings').default);
}
