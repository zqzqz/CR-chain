var express = require('express');
var router = express.Router();
var Torrent = require('../component/torrent.js');
var cryptoUtils = require('../component/cryptoUtils.js');
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var multipart = require('connect-multiparty');
var multipartMid = multipart();
var stream = require('stream');

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
            //var crypted = cryptoUtils.AES_encrypt(data.secret, null, doc);
            //var buf = new Buffer(crypted);
            //buf.name = data.title;
            Torrent.clear();
            return res.send({success:true, hash:hash});
        }
    })
});

router.route('/torrent').get(function(req, res, next) {
    var data = req.query;
    Torrent.clear();
    var curFile = path.join(__dirname, "../../files/"+data.title);
    var msg = [];
    console.log(data.fid, data.title);
    console.log(curFile)
    try {
        Torrent.client.add(data.fid, {path:curFile}, Torrent.onTorrent);
        res.sendStatus(200);
    } catch(e) {
        console.error("error: ", e);
        res.sendStatus(500);
    }
});

router.route('/download').get(function(req, res, next) {
    var data = req.query;
    try {
        Torrent.client.get(data.fid).files[0].getBuffer(function(err, buffer) {

            var readStream = new stream.PassThrough();
            readStream.end(buffer);

            res.set('Content-disposition', 'attachment; filename=' + data.title);
            res.set('Content-Type', 'text/plain');

            readStream.pipe(res);
        })
    } catch(e) {
        console.error("error: ", e);
        res.redirect('/');
    }
});

router.route('/seed').get(function(req, res, next) {
    var fid = Torrent.fid;
    res.send({fid:fid, message:Torrent.message});
});

module.exports = router;