var Register = artifacts.require("./Register.sol");
var Handler = artifacts.require("./Handler.sol");

contract("Register", function(accounts) {
    var user = accounts[0];
    var user2 = accounts[1];
    var user3 = accounts[2];

    var fid = "0xbb280ff80cd7451beec35ad73398817537ec256e";
    var fid2 = "0xcc280ff80cd7451beec35ad73398817537ec256e";
 
    var handler;
    var price = 1000000000000000000;


    it("create a file", function() {
        var instance;
        return Register.deployed().then(function(inst) {
            instance = inst;
            instance.createFile.sendTransaction(fid, "title", "keyword", "summary", fid, {from:user});
            return instance.getFile.call(fid, {from: user});
        }).then(function(res) {
            console.log("file: ", res);
            assert.equal(res[0], "title", "file not match");
        }).then(function() {
            instance.deleteFile.sendTransaction(fid, {from:user});
            return instance;
        }).then(function(res) {
            console.log("file should be deleted.");
        });
    });

    it("create a Handler contract", function() {
      var instance;
      return Register.deployed().then(function(inst) {
        instance = inst;
        instance.createFile.sendTransaction(fid2, "ctitle", "ckeyword", "csummary", fid2, {from:user3});
        return instance;
      }).then(function() {
        instance.newHandler.sendTransaction(fid2, price, {from:user3});
        return instance.getHandler.call(fid2);
      }).then(function(res) {
        handler = res[0];
        console.log("Handler address: ", handler);
      }).then(function() {
        instance.requestHandler.sendTransaction(handler, "message", {from:user2, value:price});
      }).then(function() {
        instance.respondHandler.sendTransaction(handler, user2, "password", {from:user3});
      }).then(function() {
        // cannot get result at once, because calling another contract from a contract is an asyc action
        subinstance = web3.eth.contract(Handler.abi).at(handler);
        res = subinstance.getStatus.call();
        console.log("handler status: ", res);
        res = subinstance.getRequest.call(user2);
        console.log("request history: ", res);
      });
    });
});
