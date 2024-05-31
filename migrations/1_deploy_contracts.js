const Hotel = artifacts.require("hotel");

module.exports = function(deployer) {
  deployer.deploy(Hotel);
};
