import {
    SEND_EMAIL_START,
    SEND_EMAIL_SUCCESS,
    SEND_EMAIL_FAILURE,
    SENT_EMAILS_START,
    SENT_EMAILS_SUCCESS,
    SENT_EMAILS_FAILURE
} from "../actions/emailActions";


const initialState = {
    sendEmailLoading: false,
    sendEmailSuccess: null,
    sendEmailError: null,
    getEmailsLoading: false,
    getEmailsSuccess: null,
    getEmailsError: null
}

function emailReducer(state = initialState, action) {
    switch (action.type) {
        case SEND_EMAIL_START:
            return {
                ...state,
                sendEmailLoading: true,
            }

        case SEND_EMAIL_SUCCESS:
            return {
                ...state,
                sendEmailLoading: false,
                sendEmailSuccess: action.payload,
            }
        case SEND_EMAIL_FAILURE:
            return {
                ...state,
                sendEmailLoading: false,
                sendEmailError: action.payload,
            }
        case SENT_EMAILS_START:
            return {
                ...state,
                getEmailsLoading: true
            }
        case SENT_EMAILS_SUCCESS:
            return {
                ...state,
                getEmailsSuccess: action.payload,
                getEmailsLoading: false,
            }
        case SENT_EMAILS_FAILURE:
            return {
                ...state,
                getEmailsLoading: false,
                getEmailsError: action.payload
            }
        default:
            return state
    }
}

export default emailReducer;