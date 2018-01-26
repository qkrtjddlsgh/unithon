var express = require('express');
var router = express.Router();
var diary = require('../../models/Diary');

router.post('/', function(req, res){
    var recv_data = req.body;

    var id = recv_data.id;
    var date = recv_data.date;
    var content = recv_data.content;

    diary.find({id: id, date: date}, function(err, result){
        if(err){
            console.error(err.message);
        }
        if(result.length == 0){
            var new_diary = new diary();
            new_diary.id = id;
            new_diary.date = date;
            new_diary.content = content;
            new_diary.save();

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