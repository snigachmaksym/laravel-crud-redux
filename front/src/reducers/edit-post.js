import { EDIT_POST, SUCCESS_UPDATE_LIST} from '../actions/types';
const initialState = null;

export default function postReducer(state = initialState, action) {
    switch (action.type) {
        case EDIT_POST:
            return action.editPost;
        case SUCCESS_UPDATE_LIST:
            return {
                id: null,
                title: '',
                body: '',
            };
        default:
            return state;
    }
}