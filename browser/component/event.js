var Web3 = require('web3');
var fs = require('fs');
var truffle = require('truffle-contract');
var path = require('path');

var contracts = {};
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));
var contract_json = path.join(__dirname, "../../contract/build/contracts/Register.json");
var artifacts = JSON.parse(fs.readFileSync(contract_json, 'utf8'));
//console.log(artifacts);


contracts.Register = web3.eth.contract(artifacts.abi).at(artifacts.networks['4447']['address']);


contracts.Register.CreateFile({})
  .watch(function(error, result) {
    console.log("listen create file: ", result['args']);
    // do something
    var message = result['args'];
    var file = global.dbHandler.getModel('file');
    file.create(message, function (err, doc) {
      if (err) {
        console.log("createFile", err);
      } else {
        console.log("createFile", message.fid);
      }
    });
  });



var event_listener = {

};

module.exports = event_listener;
