/**
 * @format
 */

import App from './App';
import {Provider} from 'react-redux';
import {registerScreens} from './app/screens';
import {Navigation} from 'react-native-navigation';
import store from './app/store';
Navigation.registerComponent(`steedosNative`, () => App);
Navigation.events().registerAppLaunchedListener(() => {
    console.log('registerAppLaunchedListener store', store);
    registerScreens(store, Provider);
    Navigation.setRoot({
        root: {
          component: {
            name: 'steedosNative'
          }
        }
      });
  });
