import { request } from '../datasource'
import { createAction } from './base'

export function executeApiRequest(dispatch, actionType, dataService, options) {
    return executeApi(dataService, options).then(
        (sauce) => dispatch(executeApiSauce(actionType, sauce, options)),
        (error) => dispatch(executeApiError(actionType, error, options)),
    );
}

export async function executeApi(dataService, options) {
    let { url, method } = options;
    return await request(dataService + url, {
        method: method ? method : "POST"
    });
}

function executeApiSauce(actionType, results, options) {
    return createAction(actionType, 'executeApiSauce', results, options);
}

function executeApiError(actionType, error, options) {
    return createAction(actionType, 'executeApiError', {error: error}, options);
}