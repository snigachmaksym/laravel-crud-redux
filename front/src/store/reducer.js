import {success, error} from 'redux-saga-requests';

import {
    AUTH_LOGIN,
    AUTH_REGISTER,
    SIGN_OUT,
    FETCH_AUTH_USER,
} from './auth/actions';

import {
    CREATE_USER_POST,
    UPDATE_USER_POST,
    DELETE_USER_POST,
    SET_EDIT_POST,
    CLEAR_FORM
} from './posts/actions'

import {axiosController} from '../utils/axiosController';
import {STATE_STATUSES} from '../utils/stateStatuses';

const initialState = {
    user: {},
    status: STATE_STATUSES.INIT,
    isAuthenticated: false,
    posts: [],
    editPost: {
        id: null,
        title: '',
        body: '',
    },
    exception: {
        message: null,
        errors: {}
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTH_LOGIN: {
            return processReducer(state);
        }

        case success(AUTH_LOGIN): {
            axiosController.saveToken(action.data.token);
            return {
                ...state,
                user: action.data.user,
                status: STATE_STATUSES.READY,
                isAuthenticated: true,
                posts: action.data.user.posts.reverse()
            };
        }
        case error(AUTH_LOGIN): {
            return errorReducer(action, state);
        }
        case AUTH_REGISTER: {
            return processReducer(state);
        }

        case success(AUTH_REGISTER): {
            axiosController.saveToken(action.data.token);
            return {
                ...state,
                user: action.data.user,
                status: STATE_STATUSES.READY,
                isAuthenticated: true,
                posts: []
            };
        }

        case error(AUTH_REGISTER): {
            return errorReducer(action, state);
        }

        case SIGN_OUT: {
            axiosController.deleteToken();
            return {
                ...state,
                user: {},
                isAuthenticated: false,
                posts: [],
            };
        }

        case FETCH_AUTH_USER: {
            return processReducer(state);
        }
        case success(FETCH_AUTH_USER): {
            return {
                ...state,
                user: action.payload.data.user,
                status: STATE_STATUSES.READY,
                isAuthenticated: true,
                posts: action.payload.data.posts.reverse()
            };
        }
        case error(FETCH_AUTH_USER): {
            return {
                ...state,
                status: STATE_STATUSES.ERROR,
                exception: {
                    message: action.payload.response.data.message
                }
            };
        }
        case CREATE_USER_POST: {
            return processReducer(state);
        }
        case success(CREATE_USER_POST): {
            let posts = state.posts;
            return {...state, editPost: {...initialState.editPost}, posts: [action.data, ...posts]};
        }

        case error(CREATE_USER_POST): {
            return errorReducer(action, state);
        }

        case UPDATE_USER_POST: {
            return {
                ...state,
                status: STATE_STATUSES.PENDING,
                exception: {...initialState.exception}
            };
        }
        case success(UPDATE_USER_POST): {
            let posts = state.posts;
            return {
                ...state,
                editPost: {...initialState.editPost},
                posts: posts.map(post => post.id === parseInt(action.data.id, 10) ? action.data : post)
            };
        }

        case error(UPDATE_USER_POST): {
            return errorReducer(action, state);
        }

        case DELETE_USER_POST: {
            return processReducer(state);
        }
        case success(DELETE_USER_POST): {
            let posts = state.posts;
            return {
                ...state,
                editPost: {...initialState.editPost},
                posts: posts.filter(post => post.id !== parseInt(action.data, 10))
            };
        }

        case error(DELETE_USER_POST): {
            return errorReducer(action, state);
        }

        case SET_EDIT_POST: {
            return {...state, editPost: action.data, exception: {...initialState.exception}};
        }
        case CLEAR_FORM: {
            return {
                ...state,
                status: STATE_STATUSES.PENDING,
                editPost: {...initialState.editPost},
                exception: {...initialState.exception}
            };
        }
        default:
            return state;
    }

};

const processReducer = (state = initialState) => ({
    ...state,
    editPost: {...initialState.editPost},
    status: STATE_STATUSES.PENDING,
    exception: {...initialState.exception}
});


const errorReducer = (exception, state = initialState) => (
{
    ...state,
    status: STATE_STATUSES.ERROR,
    exception: {
        errors: {...exception.error.response.data.errors},
        message: exception.error.response.data.message,
    }
});

