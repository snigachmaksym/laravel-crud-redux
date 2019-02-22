import {combineReducers} from 'redux';
import posts from './posts';
import editPost from './edit-post';

export default combineReducers({
    posts,
    editPost
})