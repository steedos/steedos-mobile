import { createAction } from './base'
export var ACCOUNTS_STATE_CHANGE_ACTION = 'ACCOUNTS_STATE_CHANGE';

export function createAccountsAction(partialStateName, partialStateValue) {
    return createAction(ACCOUNTS_STATE_CHANGE_ACTION, partialStateName, partialStateValue, {})
} 

export function saveAccounts(options) {
    return function (dispatch, getState) {
        return dispatch(createAccountsAction('saveAccounts', options))
    };
}