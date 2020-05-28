import * as ActionTypes from '../constands/ActionType'

export const loginAction = (payload) =>{
    return {
        type: ActionTypes.LOGIN_CONST,
        payload
    }
}