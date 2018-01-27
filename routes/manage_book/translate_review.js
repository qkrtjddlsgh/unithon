// 네이버 Papago NMT API 예제
var express = require('express');
var router = express.Router();

var client_id = 'Uuri286TO_0SEQFRbb7t';
var client_secret = 'BRnt6tr_Vt';

var query = "안녕하세요 감사합니다";

router.get('/', function (req, res) {

    var api_url = 'https://openapi.naver.com/v1/papago/n2mt';
    var request = require('request');

    var options = {
        url: api_url,
        form: {'source':'ko', 'target':'en', 'text': query},
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };

    request.post(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
            // console.log(JSON.parse(body).message.result.translatedText);
            res.end(body);

        } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
        }
    });

});

module.exports = router;