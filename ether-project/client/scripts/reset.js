const SimpleStorage = artifacts.require("./SimpleStorage.sol");

module.exports = async function (callback) {
  let resetAll = await SimpleStorage.deployed();
  await resetAll.resetAll();
  console.log("everything is reset!!!");
  callback();
};

//truffle exec reset.js za pokretanje skripte
