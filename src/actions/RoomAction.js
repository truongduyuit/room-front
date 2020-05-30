import * as ActionTypes from '../constands/ActionType';

export const GET_ROOMS = (payload) =>{
    return {
        type: ActionTypes.GET_ROOMS_CONST,
        payload
    };
};