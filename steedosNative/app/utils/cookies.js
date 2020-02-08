import AsyncStorage from '@react-native-community/async-storage';

export const getCookie = async (name)  => {
    const steedosCookies = await AsyncStorage.getItem('STEEDOS_ACCOUNTS_COOKIES');
    const steedosCookiesMap = JSON.parse(steedosCookies);
    return steedosCookiesMap[name]?.value || steedosCookiesMap[name]
}
