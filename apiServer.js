var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//=============================================================
                    //API commands START
//=============================================================
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bookshop');

var db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error!'));

//------>>>SET UP SESSION<<<------
app.use(session({
  secret: '@#$%DFGH$%^DFGHy876n(*&^FGH9876)',
  resave: false,
  saveUnintialized: false,
  store: new MongoStore({ mongooseConnection: db, ttl: 2 * 24 * 60 * 60 }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 2 }
}));

//SAVE SESSION CART USING API
app.post('/cart', function(req, res){
  var cart = req.body;
  req.session.cart = cart;
  req.session.save(function(err){
    if(err){
      throw err;
    }
    res.json(req.session.cart);
  });
});

//GET SESSION CART USING API
app.get('/cart', function(req, res){
  if(typeof req.session.cart !== 'undefined'){
    res.json(req.session.cart);
  }
});
//------>>>END SET UP SESSION<<<------

var Books = require('./models/books');

//------>>>POST BOOKS<<<------
app.post('/books', function(req, res){
  var book = req.body;
  Books.create(book, function(err, books){
    if(err){
      throw err;
    }
    res.json(books);
  });
});

//------>>>GET BOOKS<<<------
app.get('/books', function(req, res){
  Books.find(function(err, books){
    if(err){
      throw err;
    }
    res.json(books);
  });
});

//------>>>DELETE BOOKS<<<------
app.delete('/books/:_id', function(req, res){
  var query = { _id: req.params._id };
  Books.remove(query, function(err, books){
    if(err){
      throw err;
    }
    res.json(books);
  });
});

//------>>>UPDATE BOOKS<<<------
app.put('/books/:_id', function(req, res){
  var book = req.body;
  var bookID = req.params._id;
  //if the field doesn't exist, $set will set a new field
  var updateDoc = {
    '$set': {
      title: book.title,
      description: book.description,
      image: book.image,
      price: book.price
    }
  };
  //when TRUE, returns the updated document
  var options = { new: true };
  Books.findOneAndUpdate(bookID, updateDoc, options, function(err, books){
    if(err){
      throw err;
    }
    res.json(books);
  });
});

//------>>>GET IMAGES<<<------
app.get('/images', function(req, res){
  const imagesFolder = __dirname + '/public/images/';
  const fs = require('fs');
  fs.readdir(imagesFolder, function(err, files){
    if(err){
      return console.error(err);
    }
    const filesArr = [];
    files.forEach(function(file){
      filesArr.push({ name: file });
    });
    res.json(filesArr);
  });
});
//=============================================================
                    //API commands END
//=============================================================

app.listen(3001, function(err){
  if(err){
    throw err;
  }
  console.log('API SERVER is listening on http://localhost:3001');
});
