export const REQUEST_TYPE_API = 'REQUEST_TYPE_API';
export const RECEIVE_TYPE_API = 'RECEIVE_TYPE_API';
export const CLEAR_DATA = 'CLEAR_DATA';

const requestTypeApi = () => ({
  type: REQUEST_TYPE_API,
});

const receiveTypeApi = (data) => ({
  type: RECEIVE_TYPE_API,
  data,
});

export const clearData = () => ({
  type: CLEAR_DATA,
});

export function fetchSearchIngredients(searchIngredient, pathname) {
  return async (dispatch) => {
    dispatch(requestTypeApi());
    const type = pathname.includes('/bebidas') ? 'cocktail' : 'meal';
    const response = await fetch(`https://www.the${type}db.com/api/json/v1/1/filter.php?i=${searchIngredient}`);
    const data = await response.json();
    return dispatch(receiveTypeApi(data));
  };
}

export function fetchSearchName(searchName, pathname) {
  return async (dispatch) => {
    dispatch(requestTypeApi());
    const type = pathname === '/bebidas' ? 'cocktail' : 'meal';
    const response = await fetch(`https://www.the${type}db.com/api/json/v1/1/search.php?s=${searchName}`);
    const data = await response.json();
    return dispatch(receiveTypeApi(data));
  };
}

export function fetchSearchFirstLetter(searchFirstLetter, pathname) {
  return async (dispatch) => {
    dispatch(requestTypeApi());
    if (searchFirstLetter.length === 1) {
      const type = pathname === '/bebidas' ? 'cocktail' : 'meal';
      const response = await fetch(`https://www.the${type}db.com/api/json/v1/1/search.php?f=${searchFirstLetter}`);
      const data = await response.json();
      return dispatch(receiveTypeApi(data));
    }
    // eslint-disable-next-line no-alert
    alert('Sua busca deve conter somente 1 (um) caracter');
  };
}

export function fetchSearchBtnIngredients(searchIngredient, pathname) {
  return async (dispatch) => {
    dispatch(requestTypeApi());
    const type = pathname === '/bebidas' ? 'cocktail' : 'meal';
    const response = await fetch(`https://www.the${type}db.com/api/json/v1/1/filter.php?c=${searchIngredient}`);
    const data = await response.json();
    return dispatch(receiveTypeApi(data));
  };
}
