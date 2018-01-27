var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookData = new Schema({
    idx : Number,
    id : String,
    date : String,
    title : String,
    content : String,
    score : Number,
    like : Number
});

var book = mongoose.model('book', bookData, 'books');

module.exports = book;