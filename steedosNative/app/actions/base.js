export function createAction(actionType, partialStateName, partialStateValue, options) {
    return {
        type: actionType,
        payload: {
            partialStateName,
            partialStateValue,
            ...options
        }
    }
}