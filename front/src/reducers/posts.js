import { ADD_POST, DELETE_POST, FETCH_POST, UPDATE_POST } from '../actions/types';

export default function postReducer(state = [], action) {
    switch (action.type) {
        case ADD_POST:
            return [...state, action.payload];
        case DELETE_POST:
            return state.filter(post => post.id !== parseInt(action.payload.id, 10));
        case FETCH_POST:
            return action.posts;
        case UPDATE_POST:
            return state.map(post => post.id === parseInt(action.payload.id, 10) ? action.payload : post);
        default:
            return state;
    }
}