export const CREATE_USER_POST = 'CREATE_USER_POST';
export const UPDATE_USER_POST = 'UPDATE_USER_POST';
export const SET_EDIT_POST = 'SET_EDIT_POST';

export const onUpdatePostsList = data =>(dispatch) => {
    if (data.id) {
        return dispatch({
            type: UPDATE_USER_POST,
            request: {
                method: 'POST',
                url: `/api/post/${data.id}`,
                data
            }
        });
    } else {
        return dispatch({
            type: CREATE_USER_POST,
            request: {
                method: 'POST',
                url: '/api/post',
                data
            }
        });
    }
};


export const DELETE_USER_POST = 'DELETE_USER_POST';
export const deleteUserPost = id => ({
    type: DELETE_USER_POST,
    request: {
        method: 'DELETE',
        url: `/api/post/${id}`,
    }
});


export const setEditPost = data => ({type: SET_EDIT_POST, data});

export const CLEAR_FORM = 'CLEAR_FORM';
export const clearForm = () => ({type: CLEAR_FORM});