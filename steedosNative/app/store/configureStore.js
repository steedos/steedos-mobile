import { createStore, applyMiddleware } from 'redux'
import { rootReducer } from '../reducers'
import thunkMiddleware from 'redux-thunk'
import AsyncStorage from '@react-native-community/async-storage';
import { saveAccounts } from '../actions'

let steedosService = "";

const defaultState = {
    settings: {
        services: {
            steedos: steedosService
        }
    }
}

export default function configureAppStore(initialState = {}){

    const store = createStore(
        rootReducer,
        Object.assign({}, defaultState, initialState),
        applyMiddleware(thunkMiddleware),
    );

    AsyncStorage.getItem('STEEDOS_ACCOUNTS_COOKIES').then((res) => {
        store.dispatch(saveAccounts({cookies: JSON.parse(res || '{}')}))
    })

    return store;
}