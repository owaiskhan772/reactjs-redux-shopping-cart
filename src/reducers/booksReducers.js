'use strict'

export function booksReducers(state = {
  books: []
},
  action){
  switch (action.type) {
    case "GET_BOOKS":
      return { ...state, books:[...action.payload] };
      break;
    case "POST_BOOK":
      return { books: [...state.books, ...action.payload] };
      break;
    case "DELETE_BOOK":
      const allBooksForDelete = [...state.books];
      const deleteIndex = allBooksForDelete.findIndex(function(book){
        return book._id == action.payload;
      });
      return { books: [...allBooksForDelete.slice(0, deleteIndex), ...allBooksForDelete.slice(deleteIndex + 1)] };
      break;
    case "UPDATE_BOOK":
      const books = [...state.books];
      const updateIndex = books.findIndex(function(book){
        return book._id === action.payload._id;
      });
      const newBook = {
        ...books[updateIndex],
        title: action.payload.title,
        price: action.payload.price
      };
      return { books: [...books.slice(0, updateIndex), newBook, ...books.slice(updateIndex + 1)] };
      break;
    default:
      return state;
  }
};
