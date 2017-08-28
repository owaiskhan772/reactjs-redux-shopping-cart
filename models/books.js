'use strict'

var mongoose = require('mongoose');

var booksSchema = mongoose.Schema({
  title: String,
  description: String,
  image: String,
  price: Number
});

var Books = mongoose.model('Books', booksSchema);
module.exports = Books;
