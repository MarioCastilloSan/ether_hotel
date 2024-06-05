
const Hotel = artifacts.require("HotelBooking");

module.exports = function(deployer) {
  deployer.deploy(Hotel);
};
