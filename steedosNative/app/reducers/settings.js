import { SETTINGS_STATE_CHANGE_ACTION } from '../actions/settings'

const settings = (state = {}, action) => {
    if (action.type === SETTINGS_STATE_CHANGE_ACTION) {
        const payload = action.payload
        switch (payload.partialStateName) {
            case 'RECEIVED_SETTINGS':
                return Object.assign({}, state, action.data);
            case 'changeSteedosService':
                return Object.assign({}, {services: {...state.services, steedos: payload.partialStateValue.steedosService}});
            default:
                break;
        }
        return state;
    }
    return state;
}

export default settings