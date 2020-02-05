import { dataServicesSelector } from '../../selectors';
import { loadBootstrapDataRequest } from '../bootstrap_request'
import { createAction as baseCreateAction } from '../base'
export var BOOTSTRAP_STATE_CHANGE_ACTION = 'BOOTSTRAP_STATE_CHANGE';

export function createBootstrapAction(partialStateName, partialStateValue) {
    return baseCreateAction(BOOTSTRAP_STATE_CHANGE_ACTION, partialStateName, partialStateValue, {})
} 

export function loadBootstrapEntitiesData(options) {
    console.log('loadBootstrapEntitiesData run...');
    return function (dispatch, getState) {
        console.log('loadBootstrapEntitiesData run 13...');
        const service = dataServicesSelector(getState())
        console.log('loadBootstrapEntitiesData run 15...');
        return loadBootstrapDataRequest(dispatch, BOOTSTRAP_STATE_CHANGE_ACTION, service, options)
    };
}