
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import contactReducer from './contactReducer'
import groupReducer from './groupReducer';
import emailReducer from './emailReducer'

const rootReducer = combineReducers({
    authReducer,
    contactReducer,
    groupReducer,
    emailReducer
  })

export default rootReducer;
