var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var memberData = new Schema({
    id : String,
    name : String
});

var member = mongoose.model('member', memberData, 'members');

module.exports = member;