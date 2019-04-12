import {
    AUTH_START,
    AUTH_SUCCESS,
    AUTH_FAIL,
    AUTH_LOGOUT,
} from '../actions/authActions';


const initialState = {
    token: null,
    username: null,
    isAuthenticated: false,
    authLoading: false,
    imgUrl: null,
    authError: null,
    isAuthenticatedDone: false
}

function authReducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_START:
            return {
                ...state,
                isAuthenticated: false,
                authError: null,
                authLoading: true
            }
        case AUTH_SUCCESS:
            return {
                ...state,
                token: action.token,
                username: action.username,
                isAuthenticated: true,
                isAuthenticatedDone: true,
                authError: null,
                authLoading: false
            }
        case AUTH_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                isAuthenticatedDone: true,
                authError: action.error,
                authLoading: false
            }
        case AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                isAuthenticatedDone: true,
                authLoading: false,
                authError: null
            }
        default:
            return state;
    }
}

export default authReducer;