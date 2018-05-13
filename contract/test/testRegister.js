var Register = artifacts.require("./Register.sol");

contract("Register", function(accounts) {
    var user = accounts[0];

    var fid = "0xbb280ff80cd7451beec35ad73398817537ec256e";

    it("create a file", function() {
        return Register.deployed().then(function(instance) {
            instance.createFile.sendTransaction(fid, "Btitle", {from:user});
            return instance.getFile.call(fid);
        }).then(function(res) {
            console.log("file: ", res);
        });
    });
});
