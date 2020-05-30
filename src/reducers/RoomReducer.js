import * as ActionTypes from '../constands/ActionType';

const RoomReducerInitialState = {
    rooms: []
};

const RoomReducer = (state = RoomReducerInitialState, action) => {
    switch (action.type) {
        case ActionTypes.GET_ROOMS_CONST:
            return {...state};
        default:
            return state;
    }
};

export default RoomReducer;