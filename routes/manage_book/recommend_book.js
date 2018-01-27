var express = require('express');
var router = express.Router();
var review = require('../../models/Book');

router.get('/', function(req, res){

    review.find().sort({score: -1}).exec(function(err, result){
        if(err){
            console.error(err.message);
        }
        else{
            var add_data = new Array();

            for(var i=0; i<5; i++){
                var temp = new Object();
                temp.author = result[i].author;
                temp.image = result[i].image;
                temp.title = result[i].title;
                temp.isbn = result[i].isbn;

                add_data.push(temp);
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