import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Routes from './Routes';
import store from './redux/store';
import './App.css';

function App() {
  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
      <Provider store={ store }>
        <Routes />
      </Provider>
    </HashRouter>
  );
}

export default App;
