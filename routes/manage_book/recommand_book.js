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

            var res_data = new Object();
            res_data.code = "9999";
            res_data.response = add_data;

            res.send(res_data);
            res.end();
        }
    });

});

module.exports = router;