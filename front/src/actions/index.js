import { ADD_POST, DELETE_POST, FETCH_POST, EDIT_POST, UPDATE_POST } from  './types';
import axios from 'axios';

const apiUrl = 'http://127.0.0.1:8000/api/post';

export const createPost = ({ title, body }) => {
    return (dispatch) => {
        return axios.post(`${apiUrl}`, {title, body})
            .then(response => {
                dispatch(createPostSuccess(response.data))
            })
            .catch(error => {
                throw(error);
            });
    };
};

export const createPostSuccess =  data => {
    return {
        type: ADD_POST,
        payload: {
            id: data.id,
            title: data.title,
            body: data.body
        }
    }
};


export const updatePost = ({id, title, body }) => {
    return (dispatch) => {
        return axios.put(`${apiUrl}/${id}`, {id, title, body})
            .then(response => {
                dispatch(updatePostSuccess(response.data))
            })
            .catch(error => {
                throw(error);
            });
    };
};

export const updatePostSuccess =  data => {
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
        return axios.delete(`${apiUrl}/${id}`)
            .then(response => {
                dispatch(deletePostSuccess(response.data))
            })
            .catch(error => {
                throw(error);
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
        return  dispatch(editPostSuccess(post))
    };
};

export const fetchPosts = posts => {
    return {
        type: FETCH_POST,
        posts
    }
};

export const fetchAllPosts = () => {
    return (dispatch) => {
        return axios.get(apiUrl)
            .then(response => {
                dispatch(fetchPosts(response.data))
            })
            .catch(error => {
                throw(error);
            });
    };
};