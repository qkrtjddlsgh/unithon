var express = require('express');
var router = express.Router();
var review = require('../../models/Review');

router.post('/', function(req, res){
    var recv_data = req.body;

    var isbn = recv_data.isbn;
    var member_id = recv_data.member_id;

    var like = 0;
    var is_like = 0;
    var avg = 0;
    var voice;

    review.find({isbn: isbn}).sort({like_cnt: -1}).exec(function(err, doc){
        if(err){
            console.error(err.message);
        }
        if(doc.length == 0){
            var res_data = new Object();
            res_data.code = "8888";
            res_data.message = "No book";

            res.send(res_data);
            res.end();
        }
        else{

            for(var i=0; i<doc.length; i++){
                avg += doc[i].score;

                if(doc[i].score >= 0){
                    like++;
                }
            }

            avg /= doc.length;

            var main_title = doc[0].title;

            if(avg < -0.7)
                voice = main_title + "을 읽은 다른 사람들은 대부분 많이 슬퍼하셨어요.";
            else if(avg < -0.2)
                voice = main_title + "을 읽은 다른 사람들은 조금 슬퍼하셨어요.";
            else if(avg < 0.2)
                voice = main_title + "을 읽은 다른 사람중에 즐거워하기도 슬퍼하기도 하셨어요.";
            else if(avg < 0.7)
                voice = main_title + "을 읽은 다른 사람들은 조금 즐거워하셨어요.";
            else
                voice = main_title + "을 읽은 다른 사람들은 거의 다 즐거워하셨어요.";

            var add_data = new Object();
            add_data.total = doc.length;
            add_data.like = like;
            add_data.hate = doc.length - like
            add_data.voice = voice;


            var res_data = new Object();
            res_data.code = "9999";
            res_data.response = add_data;

            var doc_data = new Array();

            for(var i=0; i<doc.length; i++){

                var tmp = new Object();
                is_like = 0;

                tmp.id = doc[i].id;
                tmp.title = doc[i].title;
                tmp.image = doc[i].image;
                tmp.author = doc[i].author;
                tmp.content = doc[i].content;

                for(var j=0; j<doc[i].like.length; j++){
                    if(doc[i].like[j].member_id == member_id){
                        is_like = 1;
                        break;
                    }
                }

                tmp.is_like = is_like;
                doc_data.push(tmp);
            }

            res_data.review = doc_data;

            res.send(res_data);
            res.end();
        }
    });
});

module.exports = router;