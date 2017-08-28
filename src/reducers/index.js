import { combineReducers } from 'redux';
import { booksReducers } from './booksReducers';
import { cartReducers } from './cartReducers';

export default combineReducers({
  books: booksReducers,
  cart: cartReducers
});
