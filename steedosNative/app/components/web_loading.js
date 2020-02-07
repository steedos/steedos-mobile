import React from 'react';
import {
    View,Text, StyleSheet
} from 'react-native';

export default class WebLoadingView extends React.PureComponent {
    render() {
        return (
            <View style={{flex:1,justifyContent:'center',
        alignItems:'center'}}>
                <Text style={styles.loadingText}>
                    正在加载...
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loadingText: {
        color: '#8a8a8a',
        fontSize: 16
    }
})