import { EDIT_POST, SUCCESS_UPDATE_LIST, DELETE_POST} from '../actions/types';

export default function postReducer(state = {}, action) {
    switch (action.type) {
        case EDIT_POST:
            return action.editPost;
        case SUCCESS_UPDATE_LIST:
        case DELETE_POST:
            return {id: null, title: '',body: ''};
        default:
            return state;
    }
}