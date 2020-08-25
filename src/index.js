import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';


// IMPORT REDUX
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import authReducer from './redux/reducers/authReducer';

console.log('REDUCER', authReducer);


// CREATE STORE
const store = createStore(
  authReducer,	// <--- PASS THE REDUCER
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()	  
);


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);