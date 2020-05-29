import * as ActionTypes from '../constands/ActionType';

export const GET_BLOCKS = (payload) =>{
    return {
        type: ActionTypes.GET_BLOCKS_CONST,
        payload
    };
};