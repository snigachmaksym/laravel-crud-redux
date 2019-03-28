import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import posts from './posts';
import editPost from './edit-post';


export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    posts,
    editPost
});