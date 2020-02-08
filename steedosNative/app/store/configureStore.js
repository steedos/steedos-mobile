import { createStore, applyMiddleware } from 'redux'
import { rootReducer } from '../reducers'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import AsyncStorage from '@react-native-community/async-storage';
import { saveAccounts } from '../actions'
const composeEnhancers = composeWithDevTools({ realtime: true});

let steedosService = "";

const defaultState = {
    settings: {
        services: {
            steedos: steedosService
        }
    }
}

export default function configureAppStore(initialState = {}){


    console.log('configureAppStore......');

    const store = createStore(
        rootReducer,
        Object.assign({}, defaultState, initialState),
        composeEnhancers(applyMiddleware(thunkMiddleware)),
    );

    AsyncStorage.getItem('STEEDOS_ACCOUNTS_COOKIES').then((res) => {
        console.log('res', res);
        store.dispatch(saveAccounts({cookies: JSON.parse(res || '{}')}))
    })

    return store;
}