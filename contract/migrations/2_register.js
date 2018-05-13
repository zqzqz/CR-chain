var Register = artifacts.require("./Register.sol");

module.exports = function(deployer) {
    return deployer.deploy(Register);
};
