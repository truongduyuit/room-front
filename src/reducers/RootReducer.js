import {combineReducers, createStore, compose} from 'redux';
import LoginReducer from './LoginReducer';
import BlockReducer from './BlockReducer';
import RoomReducer from './RoomReducer';

const composeEnhancers =  typeof window === 'object' && window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] ?
    window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']({
        trace: true,
        traceLimit: 25
    }) : compose;

export const RootReducer = combineReducers({
    LoginReducer,
    BlockReducer,
    RoomReducer
});

export const store = createStore(RootReducer, composeEnhancers());