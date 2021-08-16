import { REQUEST_API,
  RECEIVE_API,
  FAILED_REQUEST,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  UPDATE_ARRAY } from '../actions';

const INITIAL_STATE = {
  ingredients: [],
  recipeReceived: [],
  error: '',
  fetching: false,
};

function inProgressReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
      fetching: true,
    };
  case RECEIVE_API:
    return {
      ...state,
      fetching: false,
      recipeReceived: action.payload,
    };
  case FAILED_REQUEST:
    return {
      ...state,
      error: action.payload,
      fetching: false,
    };
  case ADD_INGREDIENT:
    return {
      ...state,
      ingredients: [...state.ingredients, action.ingredient],
    };
  case DELETE_INGREDIENT:
    return {
      ...state,
      ingredients: [...state.ingredients
        .filter((ing) => ing !== action.ingredient)],
    };
  case UPDATE_ARRAY:
    return {
      ...state,
      ingredients: action.payload,
    };
  default:
    return state;
  }
}

export default inProgressReducer;
