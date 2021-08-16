// import React from 'react';
// import { Provider } from 'react-redux';
// import { render, cleanup } from '@testing-library/react';
// import { createStore, combineReducers } from 'redux';
// import Login from '../pages/Login';
// import userReducer from '../redux/reducers/userReducer';

// const renderWithRedux = (
//   component,
//   { initialState,
//     store = createStore(combineReducers({ userReducer }), initialState) } = {},
// ) => ({
//   ...render(<Provider store={ store }>{component}</Provider>),
//   store,
// });

// describe('Testando a página de Login', () => {
//   beforeEach(cleanup);

//   it('Verifica se tem os dois inputs e o botão', () => {
//     const { getByTestId } = renderWithRedux(<Login />);
//     const emailInput = getByTestId('email-input');
//     const passwordInput = getByTestId('password-input');
//     const btn = getByTestId('login-submit-btn');

//     expect(emailInput).toBeInTheDocument();
//     expect(passwordInput).toBeInTheDocument();
//     expect(btn).toBeInTheDocument();
//   });
// });
