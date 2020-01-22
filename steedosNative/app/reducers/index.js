import { combineReducers } from 'redux'
import settingsReducer from './settings'


const combinedReducer = combineReducers({
    settings: settingsReducer
})

function crossSliceReducer(state, action) {
    return state;
}

export function rootReducer(state, action) {
    const intermediateState = combinedReducer(state, action)
    const finalState = crossSliceReducer(intermediateState, action)
    return finalState
}