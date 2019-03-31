import { GET_ERRORS, SUCCESS_UPDATE_LIST, EDIT_POST,DELETE_POST } from '../actions/types';

const initialState = {};

export default function(state = initialState, action ) {
    switch(action.type) {
        case GET_ERRORS:
            return action.payload;
        case SUCCESS_UPDATE_LIST:
        case EDIT_POST:
        case DELETE_POST:
            return initialState;
        default:
            return state;
    }
}