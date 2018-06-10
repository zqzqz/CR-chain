var Web3 = require('web3');
var fs = require('fs');
var truffle = require('truffle-contract');
var path = require('path');

var contracts = {};
var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1::9545"));
var contract_json = path.join(__dirname, "../../contract/build/contracts/Register.json");
var artifacts = JSON.parse(fs.readFileSync(contract_json, 'utf8'));
//console.log(artifacts);


contracts.Register = web3.eth.contract(artifacts.abi).at(artifacts.networks['4447']['address']);


contracts.Register.CreateFile({})
  .watch(function(error, result) {
    console.log("listen create file: ", result['args']);
    // do something
    var message = result['args'];
    var now = new Date();
    message.uploadTimestamp = now;
    var file = global.dbHandler.getModel('file');
    file.create(message, function (err, doc) {
      if (err) {
        console.log("createFile", err);
      } else {
        console.log("createFile", message.fid);
      }
    });
  });

contracts.Register.NewHandler({})
  .watch(function(error, result) {
    console.log("listen new Handler: ", result['args']);
    // do something
    var message = result['args'];
    var handler = global.dbHandler.getModel('handler');
    handler.create(message, function (err, doc) {
      if (err) {
        console.log("newHandler", err);
      } else {
        console.log("newHandler", message.hid);
      }
    });
  });

contracts.Register.DeleteFile({})
  .watch(function(error, result) {
    console.log("listen delete file: ", result['args']);
    // do something
    var message = result['args'];
    var file = global.dbHandler.getModel('file');
    file.remove({fid:message.fid}, function (err, doc) {
      if (err) {
        console.log("deleteFile", err);
      } else {
        console.log("deleteFile", message.fid);
      }
    });
  });

contracts.Register.RequestHandler({})
  .watch(function(error, result) {
    console.log("listen request Handler: ", result['args']);
    // do something
    var message = result['args'];
    var now = new Date();
    message.applyTimestamp = now;
    message.stat = 1;
    var request = global.dbHandler.getModel('request');
    request.create(message, function (err, doc) {
      if (err) {
        console.log("requestHandler", err);
      } else {
        console.log("requestHandler", message.handler);
      }
    });
  });
  
contracts.Register.RespondHandler({})
  .watch(function(error, result) {
    console.log("listen respond Handler: ", result['args']);
    // do something
    var message = result['args'];
    var now = new Date();
    message.resTimestamp = now;
    message.stat = 2;
    var request = global.dbHandler.getModel('request');
    request.update({handler:message.handler}, {$set: message}, function (err, doc) {
      if (err) {
        console.log("respondHandler", err);
      } else {
        console.log("respondHandler", message.handler);
      }
    });
  });

contracts.Register.CancelRequest({})
  .watch(function(error, result) {
    console.log("listen cancel Handler: ", result['args']);
    // do something
    var message = result['args'];
    var request = global.dbHandler.getModel('request');
    request.remove(message, {$set: message}, function (err, doc) {
      if (err) {
        console.log("cancelRequest", err);
      } else {
        console.log("cancelRequest", message.handler);
      }
    });
  });




var event_listener = {

};

module.exports = event_listener;
