export const SIGN_OUT = 'SIGN_OUT';
export const AUTH_LOGIN = 'AUTH_LOGIN';


export const login = data => ({
    type: AUTH_LOGIN,
    request: {
        method: 'POST',
        url: '/api/login',
        data
    }
});

export const AUTH_REGISTER = 'AUTH_REGISTER';
export const register = data => ({
    type: AUTH_REGISTER,
    request: {
        method: 'POST',
        url: '/api/register',
        data
    }
});

export const FETCH_AUTH_USER = 'FETCH_AUTH_USER';
export const fetchAuthUser = () => ({
    type: FETCH_AUTH_USER,
    payload: {
        request: {
            method: 'GET',
            url: '/api/userdata'
        }
    }
});

export const signOut = () => ({type: SIGN_OUT});

