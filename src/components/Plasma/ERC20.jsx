import React, { useState } from 'react';

import config from '../../utils/config.json';
import { getMaticPlasmaParent, getMaticPlasmaChild } from '../../utils/Matic';

function ERC20Plasma({ account, Networkid, selectedToken, maticProvider, ethereumprovider, onboard }) {

  const [hash, setHash] = useState('');
  const [inputValue, setInputValue] = useState("");

  // Plasma ERC20 functionality
  const depositERC20Plasma = async () => {
    await onboard.walletCheck();
    const { matic } = await getMaticPlasmaParent(maticProvider, account);
    const x = inputValue * 1000000000000000000; // 18 decimals
    const x1 = x.toString();
    await matic.approveERC20TokensForDeposit(config.plasmaRootERC20, x1, {
      from: account,
    });
    const tx = await matic.depositERC20ForUser(config.plasmaRootERC20, account, x1, {
      from: account,
    });
    setHash(`Deposit: ${tx.transactionHash}`);
  };
  const burnERC20Plasma = async () => {
    await onboard.walletCheck();
    const { matic } = await getMaticPlasmaChild(ethereumprovider, account);
    const x = inputValue * 1000000000000000000; // 18 decimals
    const x1 = x.toString();
    await matic.startWithdraw(config.plasmaChildERC20, x1, {
      from: account,
    })
      .then((res) => {
        console.log("burn erc20 plasma txn hash", res.transactionHash);
        setHash(`Burn: ${res.transactionHash}`);
      });
  };
  const confirmWithdrawERC20Plasma = async () => {
    await onboard.walletCheck();
    const { matic } = await getMaticPlasmaParent(maticProvider, account);
    await matic.withdraw(inputValue, {
      from: account,
    })
      .then((res) => {
        console.log("Confirm withdraw hash: ", res.transactionHash);
        setHash(`Withdraw: ${res.transactionHash}`);
      });
  };
  const exitERC20Plasma = async () => {
    await onboard.walletCheck();
    const { matic } = await getMaticPlasmaParent(maticProvider, account);
    await matic
      .processExits(config.plasmaRootERC20, { from: account })
      .then((res) => {
        console.log("Process Exit hash: ", res.transactionHash);
        setHash(`Exit: ${res.transactionHash}`);
      });
  };


  return (
    <div id="PlasmaERC20" hidden={selectedToken.label === "ERC20" ? false : true}>

      <div className="input-group">
        <span className="input-group-text">Value</span>
        <input id="PlasmaERC20" type="text" className="form-control" placeholder="value" name="inputValue"
          value={inputValue} onChange={(e) => setInputValue(e.target.value)} required
        />
      </div>
      <br />

      <div className="btn-group">
        <button className="btn btn-dark"
          onClick={depositERC20Plasma} disabled={
            Networkid !== 0 && Networkid === config.MATIC_CHAINID
              ? true : false
          }> Deposit</button>

        <button className="btn btn-dark ms-2"
          onClick={burnERC20Plasma} disabled={
            Networkid !== 0 && Networkid === config.ETHEREUM_CHAINID
              ? true : false
          }> burn </button>
        <button className="btn btn-dark ms-2"
          onClick={confirmWithdrawERC20Plasma} disabled={
            Networkid !== 0 && Networkid === config.ETHEREUM_CHAINID
              ? false : true
          }> Confirm Withdraw </button>

        <button className="btn btn-dark ms-2"
          onClick={exitERC20Plasma} disabled={
            Networkid !== 0 && Networkid === config.ETHEREUM_CHAINID
              ? false : true
          }> exit </button>
      </div>

      <p id="burnHash">{hash}</p>
    </div>
  )
}

export default ERC20Plasma;
