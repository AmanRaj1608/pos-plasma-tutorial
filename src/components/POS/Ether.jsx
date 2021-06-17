import React, { useState } from 'react';

import config from '../../utils/config.json';
import { posClientParent, posClientChild } from '../../utils/Matic';

function EtherPOS({ account, Networkid, selectedToken, maticProvider, ethereumprovider, onboard }) {

  const [hash, setHash] = useState('');
  const [inputValue, setInputValue] = useState("");

  // POS ether functionality
  const depositEther = async () => {
    await onboard.walletCheck();
    const maticPoSClient = posClientParent(maticProvider, account);
    const x = inputValue * 1000000000000000000; // 18 decimals
    const x1 = x.toString();

    const tx = await maticPoSClient.depositEtherForUser(account, x1, {
      from: account,
    });
    console.log("Deposit tx: ", tx.transactionHash);
    setHash(`Deposit Tx: ${tx.transactionHash}`);
  };
  const burnEther = async () => {
    await onboard.walletCheck();
    const maticPoSClient = posClientChild(ethereumprovider, account);
    const x = inputValue * 1000000000000000000; // gwei to ether
    const x1 = x.toString();

    await maticPoSClient
      .burnERC20(config.posWETH, x1, {
        from: account,
      })
      .then((res) => {
        console.log("Burn Tx: ", res.transactionHash);
        setHash(`Burn Tx: ${res.transactionHash}`);
      });
  };
  const exitEther = async () => {
    await onboard.walletCheck();
    const maticPoSClient = posClientParent(maticProvider, account);
    await maticPoSClient
      .exitERC20(inputValue, {
        from: account,
      })
      .then((res) => {
        console.log("exit o/p", res);
        setHash(`Exit o/p: ${res.transactionHash}`);
      });
  };


  return (
    <div id="Ether" hidden={selectedToken.label === "Ether" ? false : true}>

      <div className="input-group">
        <span className="input-group-text">Value Ξ</span>
        <input id="EtherPOS" type="text" className="form-control" placeholder="value" name="inputValue"
          value={inputValue} onChange={(e) => setInputValue(e.target.value)} required
        />
      </div>
      <br />

      <div className="btn-group">
        <button className="btn btn-dark"
          onClick={depositEther} disabled={
            Networkid !== 0 && Networkid === config.MATIC_CHAINID ? true : false
          }> Deposit </button>

        <button className="btn btn-dark ms-2"
          onClick={burnEther} disabled={
            Networkid !== 0 && Networkid === config.ETHEREUM_CHAINID
              ? true : false
          }> burn</button>

        <button className="btn btn-dark ms-2"
          onClick={exitEther} disabled={
            Networkid !== 0 && Networkid === config.ETHEREUM_CHAINID
              ? false : true
          }> exit</button>
      </div>

      <p id="burnHash">{hash}</p>
    </div>
  )
}

export default EtherPOS;
