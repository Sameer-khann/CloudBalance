import {combineReducers, createStore} from 'redux'
import { toggleReducer } from './reducer'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'


const persistConfig = {
    key :'root',
    storage,
}

const rootReducer = combineReducers({
    sidebar : toggleReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
    persistedReducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__?.()
);

const persistor = persistStore(store);

export {store, persistor};