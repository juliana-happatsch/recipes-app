import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Routes from './Routes';
import store from './redux/store';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Provider store={ store }>
        <Routes />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
