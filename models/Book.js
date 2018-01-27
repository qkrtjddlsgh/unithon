var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookData = new Schema({
    id : String,
    date : String,
    title : String,
    isbn : String,
    content : String,
    score : Number,
    like : Number
});

var book = mongoose.model('book', bookData, 'books');

module.exports = book;