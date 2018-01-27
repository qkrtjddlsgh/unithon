// Imports the Google Cloud client library
const language = require('@google-cloud/language');

// Instantiates a client
const client = new language.LanguageServiceClient();

var express = require('express');
var router = express.Router();
var book = require('../../models/Book');
var today = require('../../util_modules/getToday');

router.post('/', function(req, res){
    var recv_data = req.body;

    var id = recv_data.id;
    var title = recv_data.title;
    var content = recv_data.content;

    var date = today(new Date());

    book.find({id: id, date: date, title: title}, function(err, result){
        if(err){
            console.error(err.message);
        }
        if(result.length == 0){
            var new_book = new book();
            new_book.id = id;
            new_book.date = date;
            new_book.title = title;
            new_book.content = content;
            new_book.like = 0;

            // The text to analyze
            const text = content;

            const document = {
                content: text,
                type: 'PLAIN_TEXT'
            };

            client
                .analyzeSentiment({document: document})
                .then(results => {
                const sentiment = results[0].documentSentiment;

            new_book.score = sentiment.score;
            new_book.save();

            }).catch(err => {console.error('ERROR:', err);});

            var res_data = new Object();
            res_data.code = "9999";
            res_data.message = "Success";

            res.send(res_data);
            res.end();
        }
        else{
            var res_data = new Object();
            res_data.code = "8888";
            res_data.message = "Already exist";

            res.send(res_data);
            res.end();
        }
    });
});

module.exports = router;