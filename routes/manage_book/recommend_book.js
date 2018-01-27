var express = require('express');
var router = express.Router();
var review = require('../../models/Review');

router.post('/', function(req, res){

    review.find().sort({score: -1}).exec(function(err, result){
        if(err){
            console.error(err.message);
        }
        else{
            var add_data = new Array();

            for(var i=0; i<5; i++){
                add_data.push(result[i].isbn);
            }

            var sorted_arr = add_data.slice().sort();

            var results = [];

            for (var i = 0; i < sorted_arr.length - 1; i++) {
                if (sorted_arr[i + 1] == sorted_arr[i]) {
                    results.push(sorted_arr[i]);
                }
            }

            var res_data = new Object();
            res_data.code = "9999";
            res_data.response = results;

            res.send(res_data);
            res.end();
        }
    });

});

module.exports = router;