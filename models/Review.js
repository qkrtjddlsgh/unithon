var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewData = new Schema({
    id : String,
    date : String,
    title : String,
    isbn : String,
    content : String,
    author: String,
    image: String,
    e_content : String,
    score : Number,
    like : [],
    like_cnt : Number,
    after_voice : String
});

var review = mongoose.model('review', reviewData, 'reviews');

module.exports = review;