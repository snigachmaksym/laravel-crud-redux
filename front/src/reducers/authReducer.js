import { SET_CURRENT_USER, LOG_IN_SUCCESS } from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
    isAuthenticated: false,
    user: {},
    userData: {}
};

export default function(state = initialState, action ) {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        case LOG_IN_SUCCESS:
            return {
                ...state,
                userData: action.payload
            };
        default:
            return state;
    }
}