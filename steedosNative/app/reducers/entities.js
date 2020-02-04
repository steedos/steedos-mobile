
import { BOOTSTRAP_STATE_CHANGE_ACTION } from '../actions/views/bootstrap'
import BootstrapReducer from './views/bootstrap'

function updateState(oldState, newState){
    return Object.assign({}, oldState, newState)
}

function reducer(state = {}, action){
    switch (action.type) {
        case BOOTSTRAP_STATE_CHANGE_ACTION:
            return updateState(state, BootstrapReducer(state, action))
        default:
            break;
    }
    return state;
};

export default reducer;