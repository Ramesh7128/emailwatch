import axios from 'axios';

import * as constURL from './constants';
export const SEND_EMAIL_START = 'SEND_EMAIL_START';
export const SEND_EMAIL_SUCCESS = 'SEND_EMAIL_SUCCESS';
export const SEND_EMAIL_FAILURE = 'SEND_EMAIL_FAILURE';

export const SENT_EMAILS_START = 'SENT_EMAILS_START';
export const SENT_EMAILS_SUCCESS = 'SENT_EMAILS_SUCCESS';
export const SENT_EMAILS_FAILURE = 'SENT_EMAILS_FAILURE';


export function sendEmail(data) {
    const token = localStorage.getItem('token', '')
    const url = constURL.sendEmailListURL;
    return function (dispatch) {
        return new Promise((resolve, reject) => {
            dispatch({ type: SEND_EMAIL_START });
            axios.post(url, data, { headers: { Authorization: `Token ${token}` } })
                .then(response => {
                    console.log(response.data, 'send email content');
                    dispatch({
                        type: SEND_EMAIL_SUCCESS,
                        payload: response.data
                    });
                    resolve(response.data);
    
                })
                .catch((error) => {
                    dispatch({
                        type: SEND_EMAIL_FAILURE,
                        payload: error.message
                    });
                    reject(error.message);
                });
        });
    }
}

export function getSentEmails() {
    let token = localStorage.getItem('token', '')
    let url = constURL.sendEmailListURL;
    return function (dispatch) {
        dispatch({ type: SENT_EMAILS_START })
        axios.get(url, { headers: { Authorization: `Token ${token}` } })
            .then(response=> {
                console.log(response.data);
                dispatch({
                    type: SENT_EMAILS_SUCCESS,
                    payload: response.data
                });
            })
            .catch(error=> {
                dispatch({
                    type: SENT_EMAILS_FAILURE,
                    payload: error
                });
            });
    }
}
