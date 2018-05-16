var express = require('express');
var router = express.Router();
var Torrent = require('../component/torrent.js');
var cryptoUtils = require('../component/cryptoUtils.js');
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var multipart = require('connect-multiparty');
var multipartMid = multipart();

router.route('/').post(multipartMid, function(req, res, next) {
    var data = req.body;
    //console.log(req.files.file);
    var datapath = req.files.file.path;
    Torrent.clear();
    Torrent.client.seed(datapath, Torrent.onSeed);
    fs.readFile(datapath, function(err, doc) {
        if (err) {
            console.error("open file %s failed", datapath);
            return res.send({success:false, message:"open file failure"});
        } else {
            // do hash on origin file
            var sha1 = crypto.createHash('sha1');
            var hash = sha1.update(doc).digest('hex');
            var crypted = cryptoUtils.AES_encrypt(data.secret, null, doc);
            //var buf = new Buffer(crypted);
            //buf.name = data.title;
            
            return res.send({success:true, hash:hash});
        }
    })
});

router.route('/seed').get(function(req, res, next) {
    var fid = Torrent.fid;
    res.send({fid:fid, message:Torrent.message});
});

module.exports = router;