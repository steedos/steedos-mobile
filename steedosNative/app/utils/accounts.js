import { getCookie } from '../utils';
import AsyncStorage from '@react-native-community/async-storage';

export const getUserId = async ()=>{
    return await getCookie("X-User-Id");
}

export const getAuthToken = async ()=>{
    return await getCookie("X-Auth-Token");
}

export const getSpaceId = async ()=>{
    return await AsyncStorage.getItem('STEEDOS_ACCOUNTS_SPACEID');
}

export const getAccessToken = async ()=>{
    return await getCookie("X-Access-Token");
}