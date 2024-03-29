var express = require('express');
var router = express.Router();
var review = require('../../models/Review');

router.put('/', function(req, res){
    var recv_data = req.body;

    var member_id = recv_data.member_id;
    var id = recv_data.id; // 클라이언트에서 넘겨받은 현재 접속 멤버 id
    var isbn = recv_data.isbn;

    var chk = 1;

    review.find({id: id, isbn: isbn}, function(err, result){
        if(err){
            console.error(err.message);
        }
        if(result.length == 0){
            var res_data = new Object();
            res_data.code = "8888";
            res_data.message = "No review";

            res.send(res_data);
            res.end();
        }
        else{

            for(var i=0; i<result[0].like.length; i++){
                if(result[0].like[i].member_id == member_id){
                    chk = 0;
                }
            }

            if(chk){
                var new_cnt = result[0].like_cnt + 1;

                review.update({id: id, isbn: isbn}, {$set: {like_cnt: new_cnt}}, function(err, doc){
                    if(err){
                        console.error(err.message);
                    }
                });

                review.update({id: id, isbn: isbn}, {$addToSet: {like: {"member_id": member_id}}}, function(err, result) {
                    if(err){
                        console.error(err.message);
                    }

                    var res_data = new Object();
                    res_data.code = "9999";
                    res_data.message = "pushed Like!";

                    res.send(res_data);
                    res.end();
                });
            }
            else{
                var res_data = new Object();
                res_data.code = "8888";
                res_data.message = "Already exist";

                res.send(res_data);
                res.end();
            }
        }
    });
});

module.exports = router;