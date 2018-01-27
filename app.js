var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var create_review = require('./routes/manage_book/create_review');
var search_book = require('./routes/manage_book/search_book');
var login_module = require('./routes/manage_member/login_module');
var remove_review = require('./routes/manage_book/remove_review');
var update_review = require('./routes/manage_book/update_review');
var get_my_review = require('./routes/manage_book/get_my_review');
var get_book_review = require('./routes/manage_book/get_book_review');
var translate_review = require('./routes/manage_book/translate_review');
var push_like = require('./routes/manage_book/push_like');
var remove_like = require('./routes/manage_book/remove_like');
//var recommend_book = require('./routes/recommend_book/recommend_book');
//var like_book = require('./routes/recommend_book/like_book');


var app = express();

// database connection
var mongoose = require('mongoose');

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
  console.log("Connected to mongod server");
});

mongoose.connect('mongodb://localhost/unithon_db');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/create_review', create_review);
app.use('/search_book', search_book);
app.use('/login_module', login_module);
app.use('/remove_review', remove_review);
app.use('/update_review', update_review);
app.use('/get_my_review', get_my_review);
app.use('/get_book_review', get_book_review);
app.use('/translate_review', translate_review);
app.use('/push_like', push_like);
app.use('/remove_like', remove_like);
//app.use('/recommend_book', recommend_book);
//app.use('/like_book', like_book);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
