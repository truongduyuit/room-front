import * as ActionTypes from '../constands/ActionType';
import {produce} from 'immer';

const nameInitialState = {
    userLogin: {}
}

const LoginReducer = (state = nameInitialState, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_CONST:
            console.log(action.payload)
            const newState = produce(state, draftState => {
                draftState.userLogin = action.payload.user
            })

            return newState
        default:
            return {...state}
    }
}

export default LoginReducer;
