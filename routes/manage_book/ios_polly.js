var express = require('express');
var router = express.Router();
var review = require('../../models/Review');

router.post('/', function(req, res){
    var recv_data = req.body;

    var isbn = recv_data.isbn;
    var voice;
    var avg = 0;

    review.find({isbn: isbn}, function(err, result){
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

            for(var i=0; i<result.length; i++){
                avg += result[i].score;

                if(result[i].voice != null){
                    voice = result[i].voice;
                }
            }

            avg /= result.length;

            var main_title = result[0].title;

            for(var i=0; i<result[0].title.length; i++){
                if(result[0].title[i] == '[' || result[0].title[i] == '('){
                    main_title = result[0].title.substr(0, i);
                    break;
                }
            }

            if(avg < -0.7)
                voice = main_title + "을 읽은 다른 사람들은 대부분 많이 슬퍼했어요.";
            else if(avg < -0.2)
                voice = main_title + "을 읽은 다른 사람들은 조금 슬퍼했어요.";
            else if(avg < 0.2)
                voice = main_title + "을 읽은 다른 사람들은 즐거워하기도 슬퍼하기도 했어요.";
            else if(avg < 0.7)
                voice = main_title + "을 읽은 다른 사람들은 조금 즐거워했어요.";
            else
                voice = main_title + "을 읽은 다른 사람들은 거의 다 즐거워했어요.";

            var res_data = new Object();
            res_data.voice = voice;

            res.send(res_data);
            res.end();
        }
    });

});

module.exports = router;
