// Imports the Google Cloud client library
const language = require('@google-cloud/language');

// Instantiates a client
const client = new language.LanguageServiceClient();

var express = require('express');
var router = express.Router();
var book = require('../../models/Review');
var today = require('../../util_modules/getToday');

router.post('/', function(req, res){
    var recv_data = req.body;

    var id = recv_data.id;
    var title = recv_data.title;
    var isbn = recv_data.isbn;
    var author = recv_data.author;
    var image = recv_data.image;
    var content = recv_data.content;
    var voice;

    var date = today(new Date());

    book.find({id: id, isbn: isbn, title: title}, function(err, result){
        if(err){
            console.error(err.message);
        }
        if(result.length == 0){
            var new_book = new book();
            new_book.id = id;
            new_book.date = date;
            new_book.title = title;
            new_book.author = author;
            new_book.image = image;
            new_book.isbn = isbn;
            new_book.content = content;
            new_book.like = [];
            new_book.like_cnt = 0;

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

            // 당신의 조각에서 슬픔이 느껴져요.
            // 당신의 조각에서 기쁨이 느껴져요.

            if(sentiment.score < -0.7)
                voice = "당신의 조각에서 슬픔이 느껴져요.";
            else if(sentiment.score < 0)
                voice = "당신의 조각에서 조금 슬픔이 느껴져요.";
            else if(sentiment.score < 0.1)
                voice = "당신의 조각에서 조금 기쁨이 느껴져요.";
            else if(sentiment.score < 0.7)
                voice = "당신의 조각에서 조금 기쁨이 느껴져요.";
            else
                voice = "당신의 조각에서 기쁨이 느껴져요.";

        }).catch(err => {console.error('ERROR:', err);});

            var res_data = new Object();
            res_data.code = "9999";
            res_data.voice = voice;
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