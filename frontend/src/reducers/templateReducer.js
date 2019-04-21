import {
    CREATE_TEMPLATE_START,
    CREATE_TEMPLATE_SUCCESS,
    CREATE_TEMPLATE_FAILURE,
    FETCH_TEMPLATE_START,
    FETCH_TEMPLATE_SUCCESS,
    FETCH_TEMPLATE_FAILURE
} from '../actions/templateActions';

const initial_state = {
    templatesFetchSuccess: null,
    templateFetchLoading: false,
    templateFetchError: null,
    templateCreateLoading: false,
    templateCreateSuccess: null,
    templateCreateError: null,
}


function templateReducer(state = initial_state, action) {
    switch(action.type) {
        case FETCH_TEMPLATE_START:
            return {
                ...state,
                templateFetchLoading: true
            }
        case FETCH_TEMPLATE_SUCCESS:
            return {
                ...state,
                templateFetchLoading: false,
                templateFetchSuccess: action.payload
            }
        case FETCH_TEMPLATE_FAILURE:
            return {
                ...state,
                templateFetchLoading: false,
                templateFetchError: action.payload
            }
        case CREATE_TEMPLATE_START:
            return {
                ...state,
                templateCreateLoading: true,
            }
        case CREATE_TEMPLATE_SUCCESS:
            return {
                ...state,
                templateCreateSuccess: action.payload,
                templateCreateLoading: false
            }
        case CREATE_TEMPLATE_FAILURE:
            return {
                ...state,
                templateCreateError: action.payload,
                templateCreateLoading: false
            }
        default:
            return state
    }
}

export default templateReducer; 