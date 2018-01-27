var express = require('express');
var router = express.Router();
var book = require('../../models/Review');

router.post('/', function(req, res){
    var recv_data = req.body;

    var id = recv_data.id;
    var isbn = recv_data.isbn;

    book.remove({id: id, isbn: isbn}, function(err, result){
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
            var res_data = new Object();
            res_data.code = "9999";
            res_data.message = "Review removed";

            res.send(res_data);
            res.end();
        }
    });
});

module.exports = router;