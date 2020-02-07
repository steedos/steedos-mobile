import { ACCOUNTS_STATE_CHANGE_ACTION } from '../actions'
import AsyncStorage from '@react-native-community/async-storage';

function handleAccountsUser(userData){
    console.log("handleAccountsUser", userData);
    let spaceId = '';
    if(userData?.spaces && userData.spaces.length > 0){
        spaceId = userData.spaces[0]._id
    }
    AsyncStorage.setItem("STEEDOS_ACCOUNTS_SPACEID", spaceId);
    return Object.assign({spaceId}, userData);
}

function handleAccountsCookies(data){
    AsyncStorage.setItem("STEEDOS_ACCOUNTS_COOKIES", JSON.stringify(data.cookies));
    return data;
}

const accounts = (state = {}, action) => {
    if (action.type === ACCOUNTS_STATE_CHANGE_ACTION) {
        const payload = action.payload
        switch (payload.partialStateName) {
            case 'saveAccounts':
                return Object.assign({}, state, {...handleAccountsCookies(payload.partialStateValue)});
            case 'loadAccountsUserSauce':
                return Object.assign({}, state, {...handleAccountsUser(payload.partialStateValue)});
            default:
                break;
        }
        return state;
    }
    return state;
}

export default accounts