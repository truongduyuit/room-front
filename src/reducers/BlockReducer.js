import * as ActionTypes from '../constands/ActionType';

const nameInitialState = {
    blocks: []
};

const BlockReducer = (state = nameInitialState, action) => {
    switch (action.type) {
        case ActionTypes.GET_BLOCKS_CONST:
            state.blocks = action.payload.blocks;
            return {...state};
        default:
            return {...state};
    }
};

export default BlockReducer;
