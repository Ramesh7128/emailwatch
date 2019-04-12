import axios from 'axios';
import * as constURL from './constants';
export const CREATE_CONTACT_START = 'CREATE_CONTACT_START';
export const CREATE_CONTACT_SUCCESS = 'CREATE_CONTACT_SUCCESS';
export const CREATE_CONTACT_FAILURE = 'CREATE_CONTACT_FAILURE';

export const FETCH_CONTACT_START = 'FETCH_CONTACT_START';
export const FETCH_CONTACT_SUCCESS = 'FETCH_CONTACT_SUCCESS';
export const FETCH_CONTACT_FAILURE = 'FETCH_CONTACT_FAILURE';

export function createContact(data) {
    let token = localStorage.getItem('token', '');
    let url = constURL.contactCreateListURL;
    return function (dispatch) {
        return new Promise(function(resolve, reject){
            dispatch({ type: CREATE_CONTACT_START });
            axios.post(url, data, { headers: { Authorization: `Token ${token}` } })
                .then((response) => {
                    console.log(response.data);
                    dispatch({ type: CREATE_CONTACT_SUCCESS, payload: response.data })
                    resolve(response.data);
                })
                .catch((error) => {
                    console.log(error, 'error');
                    dispatch({ type: CREATE_CONTACT_FAILURE, payload: error.message });
                    reject(error)
                })
        });
    }
}


export function getContacts() {
    let token = localStorage.getItem('token', '');
    let url = constURL.contactCreateListURL;
    return function (dispatch) {
        dispatch({ type: FETCH_CONTACT_START });
        axios.get(url, { headers: { Authorization: `Token ${token}` } })
            .then(response => {
                console.log(response.data);
                dispatch({ type: FETCH_CONTACT_SUCCESS, payload: response.data })

            })
            .catch(error => {
                dispatch({
                    type: FETCH_CONTACT_FAILURE,
                    payload: error
                })
            });
    }
}

function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}