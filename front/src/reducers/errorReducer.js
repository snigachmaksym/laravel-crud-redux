import { GET_ERRORS, SUCCESS_UPDATE_LIST } from '../actions/types';

const initialState = {};

export default function(state = initialState, action ) {
    switch(action.type) {
        case GET_ERRORS:
            return action.payload;
        case SUCCESS_UPDATE_LIST:
            return initialState;
        default:
            return state;
    }
}