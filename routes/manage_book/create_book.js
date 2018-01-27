var express = require('express');
var router = express.Router();
var book = require('../../models/Book');

router.post('/', function(req, res){
    var recv_data = req.body;

    var author = recv_data.author;
    var title = recv_data.title;
    var isbn = recv_data.isbn;
    var image = recv_data.image;


    book.find({isbn: isbn}, function(err, result){
        if(err){
            console.error(err.message);
        }
        if(result.length == 0){
            var new_book = new book();
            new_book.author = author;
            new_book.title = title;
            new_book.image = image;
            new_book.isbn = isbn;
            new_book.save();

            var res_data = new Object();
            res_data.code = "9999";
            res_data.message = "Success";

            res.send(res_data);
            res.end();
        }
        else{
            var res_data = new Object();
            res_data.code = "8888";
            res_data.message = "Already exist";

            res.send(res_data);
            res.end();
        }
    });
});

module.exports = router;