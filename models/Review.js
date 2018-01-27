var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewData = new Schema({
    id : String,
    date : String,
    title : String,
    isbn : String,
    content : String,
    score : Number,
    like : []
});

var review = mongoose.model('review', reviewData, 'reviews');

module.exports = review;