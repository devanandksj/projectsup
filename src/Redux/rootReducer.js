import { combineReducers } from 'redux';
import authReducer from './authSlice';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

export default rootReducer;
