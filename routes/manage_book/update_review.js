// Imports the Google Cloud client library
const language = require('@google-cloud/language');

// Instantiates a client
const client = new language.LanguageServiceClient();

var express = require('express');
var router = express.Router();
var book = require('../../models/Review');

router.post('/', function(req, res){
    var recv_data = req.body;

    var id = recv_data.id;
    var isbn = recv_data.isbn;
    var content = recv_data.content;

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

        var query = {$set: {content: content, score: sentiment.score}};

        book.update({id: id, isbn: isbn}, query, function(err, result){
            if(err){
                console.error(err.message);
            }
            if(result.length == 0){
                var res_data = new Object();
                res_data.code = "8888";
                res_data.message = "wrong access";

                res.send(res_data);
                res.end();
            }
            else{
                var res_data = new Object();
                res_data.code = "9999";
                res_data.message = "update success";

                res.send(res_data);
                res.end();
            }
        });
    }).catch(err => {console.error('ERROR:', err);});
});

module.exports = router;