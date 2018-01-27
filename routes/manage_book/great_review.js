var express = require('express');
var router = express.Router();
var review = require('../../models/Review');

router.get('/', function(req, res){
    var recv_data = req.body;

    var isbn = recv_data.isbn;
    var great_review; //최고리뷰
    var count = 0;

    review.find({isbn: isbn}, function(err, result){
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

            for(var i=0; i<result.length; i++){
                if(count < result[i].like.length){
                    great_review = result[i];
                    count = result[i].like.length;
                }
            }

            var res_data = new Object();
            res_data.code = "9999";
            res_data.response = great_review;
            
            res.send(res_data);
            res.end();
        }
    });

});

module.exports = router;