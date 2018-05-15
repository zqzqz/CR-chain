var express = require('express');
var router = express.Router();
var dht = require('../component/dht.js');
var cryptoUtils = require('../component/cryptoUtils.js');
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var multipart = require('connect-multiparty');
var multipartMid = multipart();

router.route('/').post(multipartMid, function(req, res, next) {
    var data = req.body;
    var datapath = req.files.file.path;
    fs.readFile(datapath, function(err, doc) {
        if (err) {
            console.error("open file %s failed", datapath);
            return res.send({success:false, message:"open file failure"});
        } else {
            // do hash on origin file
            var sha1 = crypto.createHash('sha1');
            var hash = sha1.update(doc).digest('hex');
            var crypted = cryptoUtils.AES_encrypt(data.secret, null, doc);
            dht.put(crypted).then(function(fid, err) {
                if (err) {
                    return res.send({success:false, message: err});
                } else {
                    return res.send({success:true, fid:fid, hash:hash});
                }
            })
        }
    })
});

module.exports = router;