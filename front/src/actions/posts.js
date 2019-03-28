import {ADD_POST, DELETE_POST, FETCH_POSTS, EDIT_POST, UPDATE_POST, GET_ERRORS, SUCCESS_UPDATE_LIST} from  './types';
import axios from 'axios';

const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    withCredentials: true
};

export const updatePostsList = ({id, title, body, user_id}) => {
    const url = id ? `/api/post/${id}` : `/api/post/`;
    return (dispatch) => {
        return axios.post(url, {id, title, body, user_id})
            .then(response => {
                dispatch(successUpdateList());
                dispatch(id ? updatePostSuccess(response.data) : createPostSuccess(response.data));
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data.errors
                });
            });
    };
};

export const createPostSuccess = data => {
    return {
        type: ADD_POST,
        payload: {
            id: data.id,
            title: data.title,
            body: data.body
        }
    }
};


export const successUpdateList = () => {
    return {
        type: SUCCESS_UPDATE_LIST,
        payload: {}
    }
};

export const updatePostSuccess = data => {
    return {
        type: UPDATE_POST,
        payload: {
            id: data.id,
            title: data.title,
            body: data.body
        }
    }
};

export const deletePostSuccess = id => {
    return {
        type: DELETE_POST,
        payload: {
            id
        }
    }
};

export const deletePost = id => {
    return (dispatch) => {
        return axios.delete(`/api/post/${id}`, {headers: headers})
            .then(response => {
                dispatch(deletePostSuccess(response.data))
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
    };
};

export const editPostSuccess = editPost => {
    return {
        type: EDIT_POST,
        editPost
    }
};

export const editPost = post => {
    return (dispatch) => {
        return dispatch(editPostSuccess(post))
    };
};

export const fetchPosts = posts => {
    return {
        type: FETCH_POSTS,
        posts
    }
};

export const fetchAllPosts = (userId) => {
    return (dispatch) => {
        return axios.post('/api/posts/', {userId}, {headers: headers})
            .then(response => {
                dispatch(fetchPosts(response.data))
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
    };
};