import axios from 'axios';

import * as constUrl from './constants';

export const CREATE_TEMPLATE_START = 'CREATE_TEMPLATE_START';
export const CREATE_TEMPLATE_SUCCESS = 'CREATE_TEMPLATE_SUCCESS';
export const CREATE_TEMPLATE_FAILURE = 'CREATE_TEMPLATE_FAILURE';

export const FETCH_TEMPLATE_START = 'FETCH_TEMPLATE_START';
export const FETCH_TEMPLATE_SUCCESS = 'FETCH_TEMPLATE_SUCCESS';
export const FETCH_TEMPLATE_FAILURE = 'FETCH_TEMPLATE_FAILURE';

export function createTemplate(data) {
    const token = localStorage.getItem('token', '');
    const url = constUrl.templateCreateListURL;
    return function (dispatch) {
        console.log(data, "inside action dispatch");
        return new Promise((resolve, reject) => {
            dispatch({ type: CREATE_TEMPLATE_START });
            axios.post(url, data, { headers: { Authorization: `Token ${token}` } })
                .then(response=> {
                    console.log(response.data, 'create template response');
                    dispatch({
                        type: CREATE_TEMPLATE_SUCCESS,
                        payload: response.data
                    });
                    resolve(response.data);
                })
                .catch(error => {
                    dispatch({
                        type: CREATE_TEMPLATE_FAILURE,
                        payload: error.message
                    })
                    reject(error.message);
                });
        });
    }
}


export function getTemplates() {
    let token = localStorage.getItem('token', '')
    const url = constUrl.templateCreateListURL;
    return function(dispatch) {
        return new Promise((resolve, reject) => {
            dispatch({
                type: FETCH_TEMPLATE_START
            })
            axios.get(url, { headers: { Authorization: `Token ${token}` } })
                .then(response => {
                    console.log(response.data);
                    dispatch({
                        type: FETCH_TEMPLATE_SUCCESS,
                        payload: response.data
                    });
                    resolve(response.data);
                })
                .catch(error => {
                    dispatch({
                        type: FETCH_TEMPLATE_FAILURE,
                        payload: error.message,
                    });
                    reject(error.message);
                })
        });
    } 
}