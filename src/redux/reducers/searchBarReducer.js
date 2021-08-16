import {
  REQUEST_TYPE_API,
  RECEIVE_TYPE_API,
  CLEAR_DATA,
} from '../actions/searchBarActions';

const INITIAL_STATE = {
  receiveData: [],
  isFetching: false,
};

function searchBarReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_TYPE_API:
    return {
      ...state,
      isFetching: true,
    };
  case RECEIVE_TYPE_API:
    return {
      ...state,
      receiveData: action.data,
      isFetching: false,
    };
  case CLEAR_DATA:
    return {
      ...state,
      isFetching: false,
      receiveData: [],
    };
  default:
    return state;
  }
}

export default searchBarReducer;
