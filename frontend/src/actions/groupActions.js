import axios from 'axios';
import * as constURL from './constants';
import { CREATE_CONTACT_FAILURE } from './contactActions';
export const CREATE_GROUP_START = 'CREATE_GROUP_START';
export const CREATE_GROUP_SUCCESS = 'CREATE_GROUP_SUCCESS';
export const CREATE_GROUP_FAILURE = 'CREAT_GROUP_FAILURE';

export const FETCH_GROUP_START = 'FETCH_GROUP_START';
export const FETCH_GROUP_SUCCESS = 'FETCH_GROUP_SUCCESS';
export const FETCH_GROUP_FAILURE = 'FETCH_GROUP_FAILURE';

export function getGroups() {
    const token = localStorage.getItem('token', '');
    const url = constURL.groupCreateListURL;
    return function (dispatch) {
        dispatch({ type: FETCH_GROUP_START });
        axios.get(url, { headers: { Authorization: `Token ${token}` } })
            .then(response => {
                console.log(response.data);
                dispatch({ type: FETCH_GROUP_SUCCESS, payload: response.data })
            })
            .catch(error => {
                dispatch({ type: FETCH_GROUP_FAILURE, payload: error })
            });
    }
}

export function createGroup(data) {
    const token = localStorage.getItem('token', '');
    alert(token);
    const url = constURL.groupCreateListURL;
    return function (dispatch) {
        return new Promise((resolve, reject) => {
            dispatch({ type: CREATE_GROUP_START });
            axios.post(url, data, { headers: { Authorization: `Token ${token}` } })
                .then(response => {
                    console.log(response.data, 'create group server side');
                    dispatch({
                        type: CREATE_GROUP_SUCCESS,
                        payload: response.data
                    });
                    resolve(response.data);
                })
                .catch(error => {
                    dispatch({
                        type: CREATE_GROUP_FAILURE,
                        payload: error.message
                    });
                    reject(error);
                });
        });
    }
}