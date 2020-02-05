import { getCookie } from '../utils';

export const getUserId = async ()=>{
    if(window.Meteor){
        return window.Meteor.userId()
    }
    return await getCookie("X-User-Id");
}

export const getAuthToken = async ()=>{
    if(window.Meteor){
        return window.Accounts._storedLoginToken();
    }
    return await getCookie("X-Auth-Token");
}

export const getSpaceId = async ()=>{
    if(window.Meteor){
        return window.Steedos.spaceId();
    }
    return await getCookie("X-Space-Id");
}