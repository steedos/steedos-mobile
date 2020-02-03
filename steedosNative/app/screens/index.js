import {Navigation} from 'react-native-navigation';
import React from 'react';
// import { WebView } from 'react-native-webview';
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
    Navigation.registerComponent('SteedosSettings', () => wrapper(require('./steedos_settings').default), () => require('./steedos_settings').default);
    Navigation.registerComponent('SteedosAppView', () => wrapper(require('./steedos_app_view').default), () => require('./steedos_app_view').default);
    Navigation.registerComponent('SteedosLogin', () => wrapper(require('./steedos_login').default), () => require('./steedos_login').default);
    Navigation.registerComponent('SteedosWebViewLogin', () => wrapper(require('./steedos_login2').default), () => require('./steedos_login2').default);
}
