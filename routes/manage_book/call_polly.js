var express = require('express');
var router = express.Router();
var review = require('../../models/Review');

router.post('/', function(req, res){
    var recv_data = req.body;

    var id = recv_data.id;
    var isbn = recv_data.isbn;

    review.find({isbn: isbn, id: id}, function(err, result){
        if(err){
            console.error(err.message);
        }
        if(result.length == 0){
            var res_data = new Object();
            res_data.code = "8888";
            res_data.message = "No voice";

            res.send(res_data);
            res.end();
        }
        else{
            var res_data = new Object();
            res_data.voice = result[0].after_voice;

            res.send(res_data);
            res.end();
        }
    });

});

module.exports = router;
