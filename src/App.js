import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import StyleGlobal from './styles/global';

import './config/Reactotron';

import history from './services/history';
import store from './store';
import Header from './components/Header';

import Routes from './routes';

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <StyleGlobal />
        <Header />
        <Routes />
        <ToastContainer autoClose={3000} />
      </Router>
    </Provider>
  );
}

export default App;
