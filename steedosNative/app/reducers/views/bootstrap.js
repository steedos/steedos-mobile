// import { GRID_STATE_CHANGE_ACTION } from '../../actions/views/grid'
import { BOOTSTRAP_STATE_CHANGE_ACTION } from '../../actions/views/bootstrap';
import { BootstrapTypes } from '../../action_types'

function transformEntityState(state, payload){
    return Object.assign({}, state, { ...payload.partialStateValue });
}

function reducer(state = {}, action){
    if (action.type === BOOTSTRAP_STATE_CHANGE_ACTION) {
        const payload = action.payload
        switch (payload.partialStateName) {
            case BootstrapTypes.GET_BOOTSTRAP_SUCCESS:
                return transformEntityState(state, payload);
            default:
                break;
        }
        return state;
    }
    return state;
}

export default reducer