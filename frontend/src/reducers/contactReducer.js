import {
    CREATE_CONTACT_START,
    CREATE_CONTACT_SUCCESS,
    CREATE_CONTACT_FAILURE,
    FETCH_CONTACT_START,
    FETCH_CONTACT_SUCCESS,
    FETCH_CONTACT_FAILURE
} from '../actions/contactActions';

const initialState = {
    contacts: null,
    contactLoading: false,
    contactFetchError: null,
    contactCreateLoading: false,
    contactCreateError: false,
    contactCreateSuccess: null
}

function contactReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_CONTACT_START:
            return {
                ...state,
                contactLoading: true,
                contacts: null
            }
        case FETCH_CONTACT_SUCCESS:
            return {
                ...state,
                contactLoading: false,
                contacts: action.payload
            }
        case FETCH_CONTACT_FAILURE:
            return {
                ...state,
                contactLoading: false,
                contactFetchError: action.payload,
            }
        case CREATE_CONTACT_START:
            return {
                ...state,
                contactCreateLoading: true
            }
        case CREATE_CONTACT_SUCCESS:
            return {
                ...state,
                contactCreateSuccess: action.payload,
                contacts: state.contacts.concat(action.payload),
                contactCreateLoading: false,
            }
        case CREATE_CONTACT_FAILURE:
            return {
                ...state,
                contactCreateError: action.payload,
                contactCreateLoading: false,
            }
        default:
            return state
    }
}

export default contactReducer;