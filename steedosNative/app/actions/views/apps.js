import { dataServicesSelector } from '../../selectors';
import { executeApiRequest } from '../api_request'
import { createAction as baseCreateAction } from '../base'
export var APPS_STATE_CHANGE_ACTION = 'APPS_STATE_CHANGE';

export function createAppsAction(partialStateName, partialStateValue) {
    return baseCreateAction(APPS_STATE_CHANGE_ACTION, partialStateName, partialStateValue, {})
} 

export function loadApps(options) {
    return function (dispatch, getState) {
        const service = dataServicesSelector(getState())
        return executeApiRequest(dispatch, APPS_STATE_CHANGE_ACTION, service, Object.assign({method: 'GET', url: '/api/v4/apps/all/safe_apps'}, options))
    };
}