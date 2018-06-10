var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var request = require('request');

var data_server = "127.0.0.1";
var data_port = 3000;

router.route('/file').get(function(req, res, next) {
    console.log(req.query);
    var options = {
        uri: "http://localhost:3000/file",
        method: "GET",
        qs: req.query
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

router.route('/request').get(function(req, res, next) {
    console.log(req.query);
    var options = {
        uri: "http://localhost:3000/request",
        method: "GET",
        qs: req.query
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

router.route('/respond').get(function(req, res, next) {
    console.log(req.query);
    var options = {
        uri: "http://localhost:3000/respond",
        method: "GET",
        qs: req.query
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