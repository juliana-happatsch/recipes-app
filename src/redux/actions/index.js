export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const RECEIVE_API = 'RECEIVE_API';
export const REQUEST_API = 'REQUEST_API';
export const FAILED_REQUEST = 'FAILED_REQUEST';
export const UPDATE_ARRAY = 'UPDATE_ARRAY';

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  email,
});

export const addIngredient = (ingredient) => ({
  type: ADD_INGREDIENT,
  ingredient,
});

export const deleteIngredient = (ingredient) => ({
  type: DELETE_INGREDIENT,
  ingredient,
});

const receiveAPI = (json) => ({
  type: RECEIVE_API,
  payload: json,
});

const requestAPI = () => ({
  type: REQUEST_API,
});

const failedRequest = (error) => ({
  type: FAILED_REQUEST,
  payload: error,
});

export function fetchAPI(urlType, id) {
  return (dispatch) => {
    dispatch(requestAPI());
    const url = `https://www.the${urlType}db.com/api/json/v1/1/lookup.php?i=${id}`;
    return fetch(url)
      .then((r) => r.json()
        .then(
          (json) => dispatch(receiveAPI(json)),
          (error) => dispatch(failedRequest(error)),
        ));
  };
}

export const updateArray = (array) => ({
  type: UPDATE_ARRAY,
  payload: array,
});
