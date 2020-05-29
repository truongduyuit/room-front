import * as ActionTypes from '../constands/ActionType';

const nameInitialState = {
    userLogin: {}
}

const LoginReducer = (state = nameInitialState, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_CONST:
            state.userLogin = {...action.payload.user}
           return {...state}
        default:
            return {...state}
    }
}

export default LoginReducer;
