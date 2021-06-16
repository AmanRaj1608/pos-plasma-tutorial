const MaticPoSClient = require("@maticnetwork/maticjs").MaticPOSClient;
const Network = require("@maticnetwork/meta/network");
const Matic = require("@maticnetwork/maticjs");
const config = require("./config.json");

// posClientGeneral facilitates the operations like approve, deposit, exit
export const posClientParent = (maticProvider, account) => {
  const maticPoSClient = new MaticPoSClient({
    network: config.NETWORK,
    version: config.VERSION,
    maticProvider: maticProvider,
    parentProvider: window.web3,
    parentDefaultOptions: { from: account },
    maticDefaultOptions: { from: account },
  });
  return maticPoSClient;
};

// posclientBurn facilitates the burning of tokens on the matic chain
export const posClientChild = (ethereumprovider, account) => {
  const maticPoSClient = new MaticPoSClient({
    network: config.NETWORK,
    version: config.VERSION,
    maticProvider: window.web3,
    parentProvider: ethereumprovider,
    parentDefaultOptions: { from: account },
    maticDefaultOptions: { from: account },
  });
  return maticPoSClient;
};

// getMaticPlasmaClient facilitates the burning of tokens on the matic chain
export const getMaticPlasmaParent = async (maticProvider, account) => {
  const _network = config.NETWORK;
  const _version = config.VERSION;

  const network = new Network(_network, _version);
  const matic = new Matic({
    network: _network,
    version: _version,
    parentProvider: window.web3,
    maticProvider: maticProvider,
    parentDefaultOptions: { from: account },
    maticDefaultOptions: { from: account },
  });
  await matic.initialize();
  return { matic, network };
};

// getMaticPlasmaClientBurn facilitates the operations like approve, deposit,confirmWithdraw ,exit
export const getMaticPlasmaChild = async (ethereumprovider, account) => {
  const _network = config.NETWORK;
  const _version = config.VERSION;

  const matic = new Matic({
    network: _network,
    version: _version,
    parentProvider: ethereumprovider,
    maticProvider: window.web3,
    parentDefaultOptions: { from: account },
    maticDefaultOptions: { from: account },
  });
  await matic.initialize();
  return { matic };
};
