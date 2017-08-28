'use strict'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import logger from 'redux-logger'; //install it using: npm install --save-dev redux-logger
import thunk from 'redux-thunk';

import reducers from './reducers/index';

import Main from './main';
import BooksList from './components/pages/booksList';
import BooksForm from './components/pages/booksForm';
import Cart from './components/pages/cart';

const store = createStore(reducers, applyMiddleware(thunk, logger));

ReactDOM.render(
  <Provider store={ store }>
    <Router history={ browserHistory }>
      <Route path='/' component={ Main }>
        <IndexRoute component={ BooksList } />
        <Route path='/admin' component={ BooksForm } />
        <Route path='/cart' component={ Cart } />
      </Route>
    </Router>
  </Provider>, document.getElementById('app')
);
