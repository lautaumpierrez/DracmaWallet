const DracmaCoin = artifacts.require("DracmaCoin");

module.exports = function (deployer) {
  deployer.deploy(DracmaCoin);
};
