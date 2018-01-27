var express = require('express');
var router = express.Router();
var review = require('../../models/Review');

router.post('/', function(req, res){
    var recv_data = req.body;

    var isbn = recv_data.isbn;
    var member_id = recv_data.member_id;

    var like = 0;
    var is_like = 0;
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
                if(doc[i].score >= 0){
                    like++;
                }
            }

            var add_data = new Object();
            add_data.total = doc.length;
            add_data.like = like;
            add_data.hate = doc.length - like;
            add_data.voice = voice;

            var res_data = new Object();
            res_data.code = "9999";
            res_data.response = add_data;

            var doc_data = new Array();

            for(var i=0; i<doc.length; i++){

                var tmp = new Object();
                is_like = 0;

                tmp.id = doc[i].id;
                tmp.isbn = doc[i].isbn;
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