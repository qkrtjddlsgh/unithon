var express = require('express');
var router = express.Router();
var review = require('../../models/review');

router.post('/', function(req, res){
    var recv_data = req.body;

    var name = recv_data.name;
    var id = recv_data.id;
    var isbn = recv_data.isbn;
    var chk = 0;

    review.find({id: id, isbn: isbn}, function(err, doc){
        if(err){
            console.error(err.message);
        }
        if(doc.length == 0){
            var res_data = new Object();
            res_data.code = "8888";
            res_data.message = "No review";

            res.send(res_data);
            res.end();
        }
        else{
            for(var i=0; i<doc[0].like.length; i++){
                if(doc[0])
            }
        }
    });
});