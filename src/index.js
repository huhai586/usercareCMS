import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';

import Routes from './routes';

// Main router
ReactDOM.render(
  <Provider store={store}>
    <Routes/>
  </Provider>,
    
  document.getElementById('root')
);

