import { combineReducers, createStore, compose} from "redux"
import LoginReducer from './LoginReducer'

const composeEnhancers =  typeof window === 'object' && window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] ?
    window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']({
        trace: true,
        traceLimit: 25
    }) : compose;

export const RootReducer = combineReducers({
    LoginReducer
})

export const store = createStore(RootReducer, composeEnhancers())