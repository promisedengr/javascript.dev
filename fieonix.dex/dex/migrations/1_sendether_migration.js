const SendEther = artifacts.require("SendEther");

module.exports = function (deployer) {
  deployer.deploy(SendEther);
};
