import { ACCOUNTS_STATE_CHANGE_ACTION } from '../actions'

const accounts = (state = {}, action) => {
    if (action.type === ACCOUNTS_STATE_CHANGE_ACTION) {
        const payload = action.payload
        switch (payload.partialStateName) {
            case 'saveAccounts':
                return Object.assign({}, state, {...payload.partialStateValue});
            default:
                break;
        }
        return state;
    }
    return state;
}

export default accounts