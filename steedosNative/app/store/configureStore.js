import { createStore, applyMiddleware } from 'redux'
import { rootReducer } from '../reducers'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import AsyncStorage from '@react-native-community/async-storage';
import { saveAccounts } from '../actions'
const composeEnhancers = composeWithDevTools({ realtime: true});

let steedosService = process.env.REACT_APP_API_BASE_URL || "http://192.168.3.2:5000";
if(window && window.Meteor){
    steedosService = window.Steedos.absoluteUrl('', true);
}
if (steedosService){
    // 去掉url中的最后一个斜杠
    steedosService = steedosService.replace(/\/$/, "");
}

const initialStore = {
    settings: {
        services: {
            steedos: steedosService
        }
    }
}

const store = createStore(
        rootReducer,
        Object.assign({}, initialStore),
        composeEnhancers(applyMiddleware(thunkMiddleware)),
    );

AsyncStorage.getItem('STEEDOS_COOKIES').then((res) => {
    store.dispatch(saveAccounts({cookies: JSON.parse(res || '{}')}))
})

export default store;
