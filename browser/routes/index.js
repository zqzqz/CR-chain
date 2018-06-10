var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/file', function (req, res, next) {
  console.log(req.query);
  var query = req.query;
  var file = global.dbHandler.getModel('file');
  var handler = global.dbHandler.getModel('handler');
  var opts = {
    from: "handlers",
    localField: "fid",
    foreignField: "fid",
    as: "handler"
  }

  file.aggregate([
    { $lookup: opts },
    { $match: query }
  ]).exec(function (err, data) {
    if (err) {
      // fatal err
      console.log(err)
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  })
});


router.get('/vaguefile', function (req, res, next) {
  //, {summary:/query.key/}
  //var query = req.body;
  var query = req.query;
  console.log(query)
  const reg = new RegExp(query.key, 'i');
  console.log(reg);
  var file = global.dbHandler.getModel('file');
  var match = {
    $or: [
      { title: { $regex: reg } },
      { summary: { $regex: reg } }
    ]
  }
  var opts = {
    from: "handlers",
    localField: "fid",
    foreignField: "fid",
    as: "handler"
  }

  file.aggregate([
    { $lookup: opts },
    { $match: match }
  ]).exec(function (err, data) {
    if (err) {
      // fatal err
      console.log(err)
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  })
});


/* GET home page. */
router.get('/request', function (req, res, next) {
  console.log(req.body);
  var query = req.body;
  var requests = global.dbHandler.getModel('requests');

  var opts = {
    from: "handlers",
    localField: "hid",
    foreignField: "hid",
    as: "handler"
  }
  var match = {
    from: query.key,
  }
  file.aggregate([
    { $lookup: opts },
    { $match: match }
  ]).exec(function (err, data) {
    if (err) {
      // fatal err
      console.log(err)
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  });
});


router.get('/respond', function (req, res, next) {
  console.log(req.body);
  var query = req.body;
  var requests = global.dbHandler.getModel('requests');

  var opts = {
    from: "handlers",
    localField: "hid",
    foreignField: "hid",
    as: "handler"
  }
  var match = {
    stat: 2,
  }
  file.aggregate([
    { $lookup: opts },
    { $match: match }
  ]).exec(function (err, data) {
    if (err) {
      // fatal err
      console.log(err)
      res.sendStatus(500);
    } else {
      for (var i in data) {
        console.log(i);
      }
      res.send(data);
    }
  });
});

module.exports = router;
