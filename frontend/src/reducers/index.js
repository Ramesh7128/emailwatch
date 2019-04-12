
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import contactReducer from './contactReducer'
import groupReducer from './groupReducer';

const rootReducer = combineReducers({
    authReducer,
    contactReducer,
    groupReducer
  })

export default rootReducer;
