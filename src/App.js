import React, { useEffect, useState } from "react";
import Web3 from "web3";

import Navbar from "./components/Navbar";
import WalletConnectProvider from "@maticnetwork/walletconnect-provider";

import { initOnboard } from './utils/Onboard';
import EtherPOS from './components/POS/Ether';
import ERC20POS from './components/POS/ERC20';
import EtherPlasma from './components/Plasma/Ether';
import ERC20Plasma from './components/Plasma/ERC20';

import config from "./utils/config.json";

const App = () => {
  const [account, setAccount] = useState("");
  const [Networkid, setNetworkid] = useState(0);
  const [balance, setBalance] = useState(null);
  const [wallet, setWallet] = useState({});
  const [onboard, setOnboard] = useState();

  const [maticProvider, setMaticProvider] = useState();
  const [ethereumprovider, setEthereumProvider] = useState();

  useEffect(() => {
    // init onboard and store in state
    const onboard = initOnboard({
      address: setAccount,
      network: setNetworkid,
      balance: setBalance,
      wallet: wallet => {
        if (wallet.provider) {
          setWallet(wallet)
          const web3 = window.web3 = new Web3(wallet.provider);
          console.log(web3);
          // provider = web3;

          console.log(wallet.name);
          window.localStorage.setItem('selectedWallet', wallet.name)
        } else {
          // provider = null
          setWallet({})
        }
      }
    })
    setOnboard(onboard)

    // init matic and ethereum provider
    const maticProvider = new WalletConnectProvider({
      host: config.MATIC_RPC,
      callbacks: {
        onConnect: console.log("matic connected"),
        onDisconnect: console.log("matic disconnected!"),
      },
    });
    const ethereumProvider = new WalletConnectProvider({
      host: config.ETHEREUM_RPC,
      callbacks: {
        onConnect: console.log("mainchain connected"),
        onDisconnect: console.log("mainchain disconnected"),
      },
    });
    setMaticProvider(maticProvider);
    setEthereumProvider(ethereumProvider);
  }, [])

  useEffect(() => {
    const previouslySelectedWallet = window.localStorage.getItem('selectedWallet')
    if (previouslySelectedWallet && onboard) {
      onboard.walletSelect(previouslySelectedWallet);
    }
  }, [onboard])

  const bridgeOptions = [
    { label: "Proof of Stake", value: "Proof of Stake" },
    { label: "Plasma", value: "Plasma" }
  ];
  const tokenTypes = [
    { label: "Ether", value: "Ether" },
    { label: "ERC20", value: "ERC20" }
  ];

  const [selectedBridgeOption, setSelectedBridgeOption] = useState({
    label: "Proof of Stake",
  });
  const [selectedToken, setSelectedToken] = useState({
    label: "Ether",
  });

  return (
    <React.Fragment>
      <Navbar account={account} onboard={onboard} />
      <div>
        <select onChange={(e) => setSelectedBridgeOption({ label: e.target.value })}>
          {bridgeOptions.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select onChange={(e) => setSelectedToken({ label: e.target.value })}>
          {tokenTypes.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      {/**
         * POS ether functionality
         * POS ERC20 functionality
         * 
         * Plasma ether functionality
         * Plasma ERC20 functionality
      */}

      {/* =>> POS */}
      <div
        id="POS"
        hidden={selectedBridgeOption.label === "Proof of Stake" ? false : true}>
        <EtherPOS
          onboard={onboard}
          account={account}
          Networkid={Networkid}
          selectedToken={selectedToken}
          maticProvider={maticProvider}
          ethereumprovider={ethereumprovider}
        />
        <ERC20POS
          onboard={onboard}
          account={account}
          Networkid={Networkid}
          selectedToken={selectedToken}
          maticProvider={maticProvider}
          ethereumprovider={ethereumprovider}
        />
      </div>

      {/* =>> Plasma */}
      <div id="plasma" hidden={selectedBridgeOption.label === "Plasma" ? false : true}>
        <EtherPlasma
          onboard={onboard}
          account={account}
          Networkid={Networkid}
          selectedToken={selectedToken}
          maticProvider={maticProvider}
          ethereumprovider={ethereumprovider}
        />
        <ERC20Plasma
          onboard={onboard}
          account={account}
          Networkid={Networkid}
          selectedToken={selectedToken}
          maticProvider={maticProvider}
          ethereumprovider={ethereumprovider}
        />
      </div>
    </React.Fragment>
  );
};

export default App;
