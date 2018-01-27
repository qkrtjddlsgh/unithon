var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookData = new Schema({
    title: String,
    isbn: String,
    author: String,
    image: String
});

var book = mongoose.model('book', bookData, 'books');

module.exports = book;