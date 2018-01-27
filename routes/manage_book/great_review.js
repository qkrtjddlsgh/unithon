var express = require('express');
var router = express.Router();
var review = require('../../models/Review');

router.post('/', function(req, res){
    var recv_data = req.body;

    var great_review; //최고리뷰


    var count = 0;
    var is_like = 0;

    review.find().sort().exec(function(err, doc){
        if(err){
            console.error(err.message);
        }
        else{
            var doc_data = new Array();

            for(var i=0; i<doc.length; i++){

                var tmp = new Object();
                is_like = 0;

                tmp.id = doc[i].id;
                tmp.content = doc[i].content;

                for(var j=0; j<doc[i].like.length; j++){
                    if(doc[i].like[j].name == name){
                        is_like = 1;
                        break;
                    }
                }

                tmp.is_like = is_like;
                doc_data.push(tmp);
            }
        }
    });

    /*review.find({isbn: isbn}, function(err, result){
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
    });*/

});

module.exports = router;