var express = require('express');
var router = express.Router();

var client_id = 'Uuri286TO_0SEQFRbb7t';
var client_secret = 'BRnt6tr_Vt';

router.post('/', function(req, res){
    var recv_data = req.body;

    var title = recv_data.title;

    router.get('/search/blog', function (req, res) {
        // var api_url = 'https://openapi.naver.com/v1/search/book?query=' + encodeURI(req.query.query); // json 결과
        var api_url = 'https://openapi.naver.com/v1/search/book?query=' + title;

        var request = require('request');

        var options = {
            url: api_url,
            headers: {'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret}
        };

        request.get(options, function (error, response, body) {
            if(!error && response.statusCode == 200) {
                res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
                // res.end(body);

                var res_data = new Object();
                res_data.response = body;

                res.send(res_data);
                res.end();
            }
            else{
                res.status(response.statusCode).end();
                console.log('error = ' + response.statusCode);
            }
        });
    });

});