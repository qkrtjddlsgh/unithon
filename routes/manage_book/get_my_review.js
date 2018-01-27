var express = require('express');
var router = express.Router();
var review = require('../../models/Review');

router.post('/', function(req, res){
    var recv_data = req.body;

    var id = recv_data.id;

    review.find({id: id}).sort({score: -1}).exec(function(err, result){
        if(err){
            console.error(err.message);
        }
        if(result.length == 0){
            var res_data = new Object();
            res_data.code = "8888";
            res_data.message = "review not exist";

            res.send(res_data);
            res.end();
        }
        else{
            var res_data = new Object();
            res_data.code = "9999";
            res_data.response = result;

            res.send(res_data);
            res.end();
        }
    });

});

module.exports = router;