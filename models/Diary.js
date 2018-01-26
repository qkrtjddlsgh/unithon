var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var diaryData = new Schema({
    id : String,
    date : String,
    content : String
});

var diary = mongoose.model('diary', diaryData, 'diaries');

module.exports = diary;