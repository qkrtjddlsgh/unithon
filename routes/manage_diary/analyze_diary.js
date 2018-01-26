// Imports the Google Cloud client library
const language = require('@google-cloud/language');

// Instantiates a client
const client = new language.LanguageServiceClient();

var express = require('express');
var router = express.Router();
var diary = require('../../models/Diary');

router.post('/', function(req, res){
    var recv_data = req.body;

    var id = recv_data.id;
    var date = recv_data.date;

    diary.find({id: id, date: date}, function(err, doc){
        if(err){
            console.error(err.message);
        }
        if(doc.length == 0){
            var res_data = new Object();
            res_data.code = "8888";
            res_data.message = "No data";
        }
        else{
            // The text to analyze
            const text = doc[0].content;

            const document = {
                content: text,
                type: 'PLAIN_TEXT'
            };

            // Detects the sentiment of the text
            client
                .analyzeSentiment({document: document})
                .then(results => {
                const sentiment = results[0].documentSentiment;

            var add_data = new Object();
            add_data.test = text;
            add_data.score = sentiment.score;
            add_data.magnitude = sentiment.magnitude;

            var res_data = new Object();
            res_data.code = "9999";
            res_data.response = add_data;

            res.send(res_data);
            res.end();

            }).catch(err => { console.error('ERROR:', err); });
        }
    });
});

module.exports = router;