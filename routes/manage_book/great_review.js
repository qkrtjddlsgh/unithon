var express = require('express');
var router = express.Router();
var review = require('../../models/Review');

router.post('/', function(req, res){

    var id = req.body.id;
    var is_like = 0;

    review.find().sort({like_cnt: -1}).exec(function(err, doc){
        if(err){
            console.error(err.message);
        }
        else{
            var doc_data = new Array();

            for(var i=0; i<5; i++){

                var tmp = new Object();
                is_like = 0;

                tmp.id = doc[i].id;
                tmp.isbn = doc[i].isbn;
                tmp.content = doc[i].content;

                for(var j=0; j<doc[i].like_cnt; j++){
                    if(doc[i].like[j].member_id == id){
                        is_like = 1;
                        break;
                    }
                }

                tmp.is_like = is_like;
                doc_data.push(tmp);
            }

            var res_data = new Object();

            res_data.code = "9999";
            res_data.response = doc_data;

            res.send(res_data);
            res.end();
        }
    });

});

module.exports = router;