var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var request = require('request');

var data_server = "127.0.0.1";
var data_port = 3000;
var data_uri = "http://localhost:3000/file"

router.route('/file').get(function(req, res, next) {
    var options = {
        uri: data_uri,
        method: "GET",
        multipart: [
            {
                'content-type': 'application/json',
                body: JSON.stringify(req.body)
            }
        ]
    }
    request(options, function(error, response, body) {
        if (error) {
            console.log(error);
            return res.sendStatus(500);
        } else {
            return res.send(body);
        }
    })
});



module.exports = router;