/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,Alert
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { showModal, goToScreen } from './app/actions/navigation'
import AsyncStorage from '@react-native-community/async-storage';
import store from './app/store'; 
import { saveAccounts } from './app/actions';

const App: () => React$Node = () => {

  showApps = ()=>{
    // Alert.alert('Button with adjusted color pressed')
    const modalOptions = {
        topBar: {
            leftButtons: [{
                id: 'close-settings',
                text: "关闭",
            }],
        },
    };
    showModal("SteedosSettings", '工作台', {}, modalOptions);
    return ;
  }

  showWebLogin = ()=>{
    const modalOptions = {
        topBar: {
            leftButtons: [{
                id: 'close-web-login',
                text: "关闭",
            }],
        },
    };
    showModal("SteedosWebViewLogin", 'web登录', {}, modalOptions);
    return ;
  }

  // showLogin = ()=>{
  //   // Alert.alert('Button with adjusted color pressed')
  //   const modalOptions = {
  //       topBar: {
  //           leftButtons: [{
  //               id: 'close-settings',
  //               text: "关闭",
  //           }],
  //       },
  //   };
  //   showModal("SteedosLogin", '登录', {}, modalOptions);
  //   return ;
  // }

  removeSteedosToken = async ()=>{
    store.dispatch(saveAccounts({cookies: {}}))
    await AsyncStorage.removeItem("STEEDOS_ACCOUNTS_COOKIES");
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <Button
              title="显示Apps"
              onPress={showApps}
            />
            {/* <Button
              title="Steedos 登录"
              onPress={showLogin}
            /> */}
            <Button
              title="Steedos Web 登录"
              onPress={showWebLogin}
            />
            <Button
              title="remove Steedos Token"
              onPress={removeSteedosToken}
            />
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
