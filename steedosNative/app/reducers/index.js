import { combineReducers } from 'redux'
import settingsReducer from './settings'
import entitiesReducer from './entities'
import requests from './requests';

const combinedReducer = combineReducers({
    entities: entitiesReducer,
    settings: settingsReducer,
    requests
})

function crossSliceReducer(state, action) {
    return state;
}

export function rootReducer(state, action) {
    const intermediateState = combinedReducer(state, action)
    const finalState = crossSliceReducer(intermediateState, action)
    return finalState
}