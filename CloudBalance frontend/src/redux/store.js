import {combineReducers, createStore} from 'redux'
import { toggleReducer } from './reducer'



const rootReducer = combineReducers({
    sidebar : toggleReducer
})

const store = createStore(rootReducer);

export default store;