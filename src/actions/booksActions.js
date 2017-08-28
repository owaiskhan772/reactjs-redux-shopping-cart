'use strict'
import axios from 'axios';

export function getBooks(){
  return function(dispatch){
    axios.get('/api/books')
    .then(function(response){
      return dispatch({ type:'GET_BOOKS', payload: response.data });
    })
    .catch(function(err){
      return dispatch({ type:'GET_BOOKS_REJECTED', payload: err });
    });
  }
}

export function postBooks(book){
  return function(dispatch){
    axios.post('/api/books', book)
    .then(function(response){
      return dispatch({ type:'POST_BOOK', payload: response.data });
    })
    .catch(function(err){
      return dispatch({ type:'POST_BOOK_REJECTED', payload: err });
    });
  }
}

export function deleteBooks(_id){
  return function(dispatch){
    axios.delete('/api/books/' + _id)
    .then(function(response){
      return dispatch({ type:'DELETE_BOOK', payload: _id });
    })
    .catch(function(err){
      return dispatch({ type:'DELETE_BOOK_REJECTED', payload: err });
    });
  }
}

export function updateBooks(book){
  return{
    type: "UPDATE_BOOK",
    payload: book
  };
}
