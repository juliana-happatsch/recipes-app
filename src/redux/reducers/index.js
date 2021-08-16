import { combineReducers } from 'redux';
import userReducer from './userReducer';
import searchBarReducer from './searchBarReducer';
import inProgressReducer from './inProgressReducer';

const rootReducer = combineReducers({
  userReducer,
  searchBarReducer,
  inProgressReducer,
});

export default rootReducer;
