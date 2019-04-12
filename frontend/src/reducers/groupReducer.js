import {
    FETCH_GROUP_START,
    FETCH_GROUP_SUCCESS,
    FETCH_GROUP_FAILURE,
    CREATE_GROUP_START,
    CREATE_GROUP_SUCCESS,
    CREATE_GROUP_FAILURE
} from '../actions/groupActions';

const initialState = {
    groups: null,
    groupLoading: false,
    groupFetcherror: null,
    groupCreateLoading: false,
    groupCreateSuccess: null,
    groupCreateError: null
}

function groupReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_GROUP_START:
            return {
                ...state,
                groupLoading: true,
                groups: null
            }
        case FETCH_GROUP_SUCCESS:
            return {
                ...state,
                groupLoading: false,
                groups: action.payload
            }
        case FETCH_GROUP_FAILURE:
            return {
                ...state,
                groupLoading: false,
                error: action.payload,
            }
        case CREATE_GROUP_START:
            return {
                ...state,
                groupCreateLoading: true
            }
        case CREATE_GROUP_SUCCESS:
            return {
                ...state,
                groups: state.groups.concat(action.payload),
                groupCreateLoading: false,
                groupCreateSuccess: action.payload,
            }
        case CREATE_GROUP_FAILURE:
            return {
                ...state,
                groupCreateError: action.payload,
                groupCreateLoading: false
            }
        default:
            return state
    }
}

export default groupReducer;