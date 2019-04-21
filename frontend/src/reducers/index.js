
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import contactReducer from './contactReducer'
import groupReducer from './groupReducer';
import emailReducer from './emailReducer';
import templateReducer from './templateReducer';

const rootReducer = combineReducers({
    authReducer,
    contactReducer,
    groupReducer,
    emailReducer,
    templateReducer,
  })

export default rootReducer;
