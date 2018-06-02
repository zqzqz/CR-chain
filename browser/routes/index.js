var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/file', function(req, res, next) {
    console.log(req.body);
    var query = req.body;
    var file = global.dbHandler.getModel('file');
    file.find(query, function(err, data) {
        if (err) {
          // fatal err
          return res.sendStatus(500);
        } else {
          return res.send(data);
        }
    })
});


/* GET home page. */
router.get('/requests', function(req, res, next) {
    console.log(req.body);
    var query = req.body;
    var requests = global.dbHandler.getModel('requests');
    requests.find(query, function(err, data) {
        if (err) {
          // fatal err
          return res.sendStatus(500);
        } else {
          return res.send(data);
        }
    })
});

module.exports = router;
