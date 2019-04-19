import axios from 'axios';
import * as constURL from './constants'; 

export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';


export const authStart = () => {
    return {
        type: AUTH_START
    }
}

export const authSuccess = (token, username) => {
    return {
        type: AUTH_SUCCESS,
        token: token,
        username: username, 
    }
}

export const authFail = error => {
    return {
        type: AUTH_FAIL,
        error: error,
    }
}

export const authLogout = () => {
    localStorage.removeItem('token');
    return {
        type: AUTH_LOGOUT,
    }
}

export const authLogin = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post(constURL.authLoginURL, {
            "user": {
                "email": email,
                "password": password,
            }
        })
            .then((res) => {
                const token = res.data.user.token;
                const username = res.data.user.username;
                localStorage.setItem('token', token);
                dispatch(authSuccess(token, username));
            })
            .catch((error) => {
                localStorage.removeItem('token');
                dispatch(authFail(error));
            });
    }
}

export const socialauthLogin = (code, provider) => {
    return dispatch => {
        dispatch(authStart());
        axios.post(constURL.socialLoginURL, {
            "code": code,
            "provider": provider
        })
            .then((res) => {
                const token = res.data.user.token;
                const username = res.data.user.username;
                localStorage.setItem('token', token);
                dispatch(authSuccess(token, username));
            })
            .catch((error) => {
                localStorage.removeItem('token');
                dispatch(authFail(error));
            });
    }
}

export const authSignUp = (email, username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post(constURL.authSignUPURL, {
            "user": {
                "email": email,
                "username": username,
                "password": password
            }
        })
            .then(res => {
                const token = res.data.user.token;
                const username = res.data.user.username
                localStorage.setItem('token', token);
                dispatch(authSuccess(token, username));
            })
            .catch((error) => {
                console.log(error.response.data);
                localStorage.removeItem('token');
                dispatch(authFail(error.response.data.user.error));
            });
    }
}

export const tokenAuthentication = () => {

    return dispatch => {
        const token = localStorage.getItem('token');
        if (token == undefined) {
            dispatch(authLogout());
        } else {
            axios.get(constURL.tokenAuthenticationURL, { headers: { Authorization: `Token ${token}` } })
                .then(res => {
                    if (res.status == 200) {
                        console.log(res.data);
                        const username = res.data.user.username;
                        dispatch(authSuccess(token, username));
                    }
                }).catch((error) => {
                    localStorage.removeItem('token');
                    dispatch(authFail(error.response.data.user.error));
                });
        }
    }
}