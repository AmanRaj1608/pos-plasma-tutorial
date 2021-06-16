import Onboard from 'bnc-onboard'
// import Notify from 'bnc-notify'
// import TransportU2F from "@ledgerhq/hw-transport-u2f";
import config from './config.json';

const networkId = config.ETHEREUM_CHAINID;
const rpcUrl = `https://rinkeby.infura.io/v3/${config.ETHEREUM_RPC}`
const dappId = 'daf7a7b8-fa67-43c7-a19f-33a7c44e31c0'

export const initOnboard = (subscriptions) => {
  return Onboard({
    dappId: dappId,
    networkId: networkId,
    subscriptions,
    walletSelect: {
      wallets: wallets,
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

const wallets = [
  { walletName: 'metamask' },
  {
    walletName: 'trezor',
    appUrl: '',
    email: '',
    rpcUrl
  },
  {
    walletName: 'ledger',
    rpcUrl
  },
  {
    walletName: 'walletConnect',
    infuraKey: 'cea9deb6467748b0b81b920b005c10c1'
  },
  { walletName: 'cobovault', appName: 'POS Bridge', rpcUrl },
  {
    walletName: 'lattice',
    appName: 'Onboard Demo',
    rpcUrl
  },
  { walletName: 'coinbase' },
  { walletName: 'status' },
  { walletName: 'walletLink', rpcUrl },
  {
    walletName: 'portis',
    apiKey: 'b2b7586f-2b1e-4c30-a7fb-c2d1533b153b'
  },
  { walletName: 'fortmatic', apiKey: 'pk_test_886ADCAB855632AA' },
  { walletName: 'torus' },
  { walletName: 'trust', rpcUrl },
  { walletName: 'opera' },
  { walletName: 'operaTouch' },
  { walletName: 'imToken', rpcUrl },
  { walletName: 'meetone' },
  { walletName: 'mykey', rpcUrl },
  { walletName: 'wallet.io', rpcUrl },
  { walletName: 'huobiwallet', rpcUrl },
  { walletName: 'hyperpay' },
  { walletName: 'atoken' },
  { walletName: 'liquality' },
  { walletName: 'frame' },
  { walletName: 'tokenpocket', rpcUrl },
  { walletName: 'authereum', disableNotifications: true },
  { walletName: 'ownbit' },
  { walletName: 'gnosis' },
  { walletName: 'bitpie' },
  { walletName: 'xdefi' },
]