import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER, LOG_IN_SUCCESS } from './types';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';
import {fetchAllPosts} from './posts';
export const registerUser = (user, history) => dispatch => {
    axios.post('/api/register', user)
        .then(res => history.push('/login'))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const loginUser = (user) => dispatch => {
    axios.post('/api/login', user)
        .then(res => {
            const { token } = res.data;
            if(token){
                localStorage.setItem('jwtToken', token);
                setAuthToken(token);
                const decoded = jwt_decode(token);
                dispatch(userInfo());
                dispatch(setCurrentUser(decoded));

            }
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export function userInfo(){
    return dispatch => {
        axios.get(`/api/userdata`,{
            headers:{ Authorization:`Bearer `+localStorage.getItem('jwtToken')}
        })
        .then(response =>{
            dispatch(loginSuccess(response.data.user));
            dispatch(fetchAllPosts(response.data.user.id))
        })
}
}
export function loginSuccess(userData) {
    return {
        type: LOG_IN_SUCCESS,
        payload: userData
    }
}
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
};

export const logoutUser = (history) => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    history ? history.push('/login') : window.location.href = '/login';
};