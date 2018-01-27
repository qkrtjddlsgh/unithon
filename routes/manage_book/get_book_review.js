var express = require('express');
var router = express.Router();
var review = require('../../models/Review');

router.post('/', function(req, res){
    var recv_data = req.body;

    var isbn = recv_data.isbn;

    var like = 0;

    review.find({isbn: isbn}, function(err, doc){
        if(err){
            console.error(err.message);
        }
        if(doc.length == 0){
            var res_data = new Object();
            res_data.code = "8888";
            res_data.message = "No book";

            res.send(res_data);
            res.end();
        }
        else{

            for(var i=0; i<doc.length; i++){
                if(doc[i].score >= 0){
                    like++;
                }
            }

            var add_data = new Object();
            add_data.total = doc.length;
            add_data.like = like;
            add_data.hate = doc.length - like;

            var res_data = new Object();
            res_data.code = "9999";
            res_data.response = add_data;
            res_data.review = doc;

            res.send(res_data);
            res.end();
        }
    });
});

module.exports = router;