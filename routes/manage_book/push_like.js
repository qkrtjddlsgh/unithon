var express = require('express');
var router = express.Router();
var review = require('../../models/Review');

router.put('/', function(req, res){
    var recv_data = req.body;

    var member_id = recv_data.id; // 클라이언트에서 넘겨받은 현재 접속 멤버 id
    var _id = recv_data._id; // review 고유 id

    var chk = 1;

    review.find({_id: _id}, function(err, result){
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
                if(result[0].like.id == id){
                    chk = 0;
                }
            }

            if(chk){
                review.update({_id: _id}, {$addToSet: {like: {id: "member_id"}}}, function(err, result) {
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

    /*//이미 좋아요 누른 사람인지 체크
    review.find({like: { $contains : member_id }}, function(err, result){
        if(err){
            console.error(err.message);
        }
        if(result.length != 0){
            var res_data = new Object();
            res_data.code = "8888";
            res.data.message = "already clicked Like!";
            res_data.response = result;
            res.send(res_data);
            res.end();
        }

        review.update({_id: _id}, { $push: { like: member_id } }, function(err, result) {
            if(err){
                console.error(err.message);
            }
            var res_data = new Object();
            res_data.code = "9999";
            res_data.message = "pushed Like!";
            res_data.response = result;
            res.send(res_data);
            res.end();
        });
    });*/
});

module.exports = router;