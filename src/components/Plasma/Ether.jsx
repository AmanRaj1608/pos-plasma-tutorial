import React, { useState } from 'react';

import config from '../../utils/config.json';
import { getMaticPlasmaParent, getMaticPlasmaChild } from '../../utils/Matic';

function EtherPlasma({ account, Networkid, selectedToken, maticProvider, ethereumprovider, onboard }) {

  const [hash, setHash] = useState('');
  const [inputValue, setInputValue] = useState("");

  // Plasma ether functionality
  const depositEtherPlasma = async () => {
    await onboard.walletCheck();
    const { matic } = await getMaticPlasmaParent(maticProvider, account);
    const x = inputValue * 1000000000000000000; // 18 decimals
    const x1 = x.toString();
    const tx = await matic.depositEther(x1, { from: account });
    console.log("Deposit hash: ", tx.transactionHash);
    setHash(`Deposit: ${tx.transactionHash}`);
  };
  const burnEtherPlasma = async () => {
    await onboard.walletCheck();
    const { matic } = await getMaticPlasmaChild(ethereumprovider, account);
    const x = inputValue * 1000000000000000000; // 18 decimals
    const x1 = x.toString();
    await matic
      .startWithdraw(config.plasmaWETH, x1, {
        from: account,
      })
      .then((res) => {
        console.log("burn ether plasma txn hash", res.transactionHash);
        setHash(`burn ether: ${res.transactionHash}`);
      });
  };
  const confirmWithdrawEtherPlasma = async () => {
    await onboard.walletCheck();
    const { matic } = await getMaticPlasmaParent(maticProvider, account);
    await matic
      .withdraw(inputValue, { from: account })
      .then((res) => {
        console.log("Confirm withdraw hash: ", res.transactionHash);
        setHash(`Confirm withdraw: ${res.transactionHash}`);
      });
  };
  const exitEtherPlasma = async () => {
    await onboard.walletCheck();
    const { matic } = await getMaticPlasmaParent(maticProvider, account);
    await matic
      .processExits(config.rootChainWETH, {
        from: account,
      })
      .then((res) => {
        console.log("process exit", res.transactionHash);
        setHash(`process exit: ${res.transactionHash}`);
      });
  };


  return (
    <div id="PlasmaEther" hidden={selectedToken.label === "Ether" ? false : true}>
      <button onClick={depositEtherPlasma} disabled={
        Networkid !== 0 && Networkid === config.MATIC_CHAINID
          ? true : false
      }> Deposit</button>

      <button onClick={burnEtherPlasma} disabled={
        Networkid !== 0 && Networkid === config.ETHEREUM_CHAINID
          ? true : false
      }> burn</button>
      <button onClick={confirmWithdrawEtherPlasma} disabled={
        Networkid !== 0 && Networkid === config.ETHEREUM_CHAINID
          ? false : true
      }> Confirm Withdraw</button>

      <button onClick={exitEtherPlasma} disabled={
        Networkid !== 0 && Networkid === config.ETHEREUM_CHAINID
          ? false : true
      }> exit</button>

      <br />
      <input id="inputValue" type="text" placeholder="value" name="inputValue"
        value={inputValue} onChange={(e) => setInputValue(e.target.value)} required
      />
      <p id="burnHash">{hash}</p>
    </div>
  )
}

export default EtherPlasma;
