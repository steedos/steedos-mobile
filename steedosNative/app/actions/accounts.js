import { createAction } from './base'
import { request } from '../datasource'
import { dataServicesSelector } from '../selectors'
import { getAccessToken } from '../utils';

export var ACCOUNTS_STATE_CHANGE_ACTION = 'ACCOUNTS_STATE_CHANGE';

export function createAccountsAction(partialStateName, partialStateValue) {
    return createAction(ACCOUNTS_STATE_CHANGE_ACTION, partialStateName, partialStateValue, {})
} 

export function saveAccounts(options) {
    return function (dispatch, getState) {
        dispatch(createAccountsAction('saveAccounts', options))
        const service = dataServicesSelector(getState())
        return loadAccountsUserData(service, options).then(
            (sauce) => dispatch(loadAccountsUserSauce(sauce)),
            (error) => dispatch(loadAccountsUserError(error)),
        );
    };
}

export async function loadAccountsUserData(service, options) {
    let url = `${service}/accounts/user`;
    let reqOptions = {
        method: "GET", 
        compress: false,
        headers: {
            'Authorization': `Bearer ${await getAccessToken()}`
        }
    }
    return await request(url, reqOptions);
}

function loadAccountsUserSauce(results) {
    return createAccountsAction('loadAccountsUserSauce', results);
}

function loadAccountsUserError(error) {
    return createAccountsAction('loadAccountsUserError', {error: error});
}