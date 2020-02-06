import { combineReducers } from 'redux'
import { APPS_STATE_CHANGE_ACTION } from '../../actions/views/apps'
import AppsReducer from './apps'
import produce from "immer"


function changeState(id, draft, newState) {
    return draft[id] = newState
}

function getState(state, id) {
    return state ? state[id] : { id: id }
}

const byId = produce((draft = {}, action) => {
    let id, viewState
    if (action.payload) {
        id = action.payload.id
        viewState = getState(draft, id)
    }
    switch (action.type) {
        case APPS_STATE_CHANGE_ACTION:
            changeState(id, draft, AppsReducer(viewState, action))
            break;
    }
    return draft;
});

export default combineReducers({
    byId
});