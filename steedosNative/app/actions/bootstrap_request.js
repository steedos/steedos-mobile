import { request } from '../datasource'
import { createAction } from './base'
import { getSpaceId } from '../utils'
import { BootstrapTypes } from '../action_types'

export function loadBootstrapDataRequest(dispatch, actionType, dataService, options) {
    dispatch(createAction(actionType, BootstrapTypes.GET_BOOTSTRAP_REQUEST, {}, {}))
    return loadBootstrapData(dataService, options).then(
        (sauce) => dispatch(loadBootstrapDataSauce(actionType, sauce, options)),
        (error) => dispatch(loadDataError(actionType, error, options)),
    );
}

export async function loadBootstrapData(dataService, options) {
    let spaceId = options.spaceId || getSpaceId();
    dataService = 'http://192.168.3.2:5000'
    let url = `${dataService}/api/bootstrap/${spaceId}`;
    return await request(url);
}

function loadBootstrapDataSauce(actionType, results, options) {
    return createAction(actionType, BootstrapTypes.GET_BOOTSTRAP_SUCCESS , results, {objectName: 'bootstrap'})
}

function loadDataError(actionType, error, options) {
    console.log('loadDataError',actionType, error, options);
    return createAction(actionType, BootstrapTypes.GET_BOOTSTRAP_FAILURE, {error: error}, options)
}