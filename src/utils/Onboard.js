import Onboard from 'bnc-onboard'
// import Notify from 'bnc-notify'
// import TransportU2F from "@ledgerhq/hw-transport-u2f";
import config from './config.json';

const networkId = config.ETHEREUM_CHAINID;
const ethRpcUrl = `https://rinkeby.infura.io/v3/${config.ETHEREUM_RPC}`
const maticRpcUrl = `https://rinkeby.infura.io/v3/${config.MATIC_RPC}`
const dappId = 'daf7a7b8-fa67-43c7-a19f-33a7c44e31c0'

export const initOnboard = (subscriptions) => {
  return Onboard({
    dappId: dappId,
    networkId: networkId,
    subscriptions,
    walletSelect: {
      wallets: wallets(networkId),
    },
    darkMode: true,
    walletCheck: [
      { checkName: 'derivationPath' },
      { checkName: 'connect' },
      { checkName: 'accounts' },
      { checkName: 'network' },
      { checkName: 'balance', minimumBalance: '100000' }
    ]
  });
}

const wallets = (cahinId) => {
  return [
    { walletName: 'metamask' },
    {
      walletName: 'trezor',
      appUrl: '',
      email: '',
      rpcUrl: cahinId === config.ETHEREUM_CHAINID ? ethRpcUrl : maticRpcUrl
    },
    {
      walletName: 'ledger',
      rpcUrl: cahinId === config.ETHEREUM_CHAINID ? ethRpcUrl : maticRpcUrl
    },
    {
      walletName: 'walletConnect',
      infuraKey: cahinId === config.ETHEREUM_CHAINID ? config.ETHEREUM_RPC : config.MATIC_RPC
    },
    {
      walletName: 'cobovault',
      appName: 'POS Bridge',
      rpcUrl: cahinId === config.ETHEREUM_CHAINID ? ethRpcUrl : maticRpcUrl
    },
    {
      walletName: 'lattice',
      appName: 'Onboard Demo',
      rpcUrl: cahinId === config.ETHEREUM_CHAINID ? ethRpcUrl : maticRpcUrl
    },
    { walletName: 'coinbase' },
    { walletName: 'status' },
    { walletName: 'walletLink', rpcUrl: cahinId === config.ETHEREUM_CHAINID ? ethRpcUrl : maticRpcUrl },
    {
      walletName: 'portis',
      apiKey: 'b2b7586f-2b1e-4c30-a7fb-c2d1533b153b'
    },
    { walletName: 'fortmatic', apiKey: 'pk_test_886ADCAB855632AA' },
    { walletName: 'torus' },
    { walletName: 'trust', rpcUrl: cahinId === config.ETHEREUM_CHAINID ? ethRpcUrl : maticRpcUrl },
    { walletName: 'opera' },
    { walletName: 'operaTouch' },
    { walletName: 'imToken', rpcUrl: cahinId === config.ETHEREUM_CHAINID ? ethRpcUrl : maticRpcUrl },
    { walletName: 'meetone' },
    { walletName: 'mykey', rpcUrl: cahinId === config.ETHEREUM_CHAINID ? ethRpcUrl : maticRpcUrl },
    { walletName: 'wallet.io', rpcUrl: cahinId === config.ETHEREUM_CHAINID ? ethRpcUrl : maticRpcUrl },
    { walletName: 'huobiwallet', rpcUrl: cahinId === config.ETHEREUM_CHAINID ? ethRpcUrl : maticRpcUrl },
    { walletName: 'hyperpay' },
    { walletName: 'atoken' },
    { walletName: 'liquality' },
    { walletName: 'frame' },
    { walletName: 'tokenpocket', rpcUrl: cahinId === config.ETHEREUM_CHAINID ? ethRpcUrl : maticRpcUrl },
    { walletName: 'authereum', disableNotifications: true },
    { walletName: 'ownbit' },
    { walletName: 'gnosis' },
    { walletName: 'bitpie' },
    { walletName: 'xdefi' },
  ]
}