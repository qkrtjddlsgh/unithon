var express = require('express');
var router = express.Router();
var member = require('../../models/Member');

router.post('/', function(req, res){
    var recv_data = req.body;

    var id = recv_data.id;

    member.find({id: id}, function(err, result){
        if(err){
            console.error(err.message);
        }
        if(result.length == 0){
            var res_data = new Object();
            res_data.code = "8888";
            res_data.message = "ID not exist";

            res.send(res_data);
            res.end();
        }
        else{
            var res_data = new Object();
            res_data.code = "9999";
            res_data.message = "Login Success";

            res.send(res_data);
            res.end();
        }
    });

});

module.exports = router;