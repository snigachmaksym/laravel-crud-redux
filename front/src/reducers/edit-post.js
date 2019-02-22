import { EDIT_POST} from '../actions/types';

export default function postReducer(state = null, action) {
    switch (action.type) {
        case EDIT_POST:
            return action.editPost;

        default:
            return state;
    }
}