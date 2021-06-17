import React from "react";

const Navbar = ({ account, onboard }) => {

  const login = async (e) => {
    e.preventDefault();
    await onboard.walletSelect();
    await onboard.walletCheck();
    // console.log("Account balance", onboard.getState().balance / 1000000000000000000);
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-5">
      <div className="container-fluid" style={{ maxWidth: 1400 }}>
        <p className="navbar-brand my-auto">Ethereum - Matic Bridge</p>
        {account ?
          <div className="" id="navbarNavDarkDropdown">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <p className="nav-link dropdown-toggle my-auto" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {truncateaccount(account)}
                </p>
                <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                  <li><p className="dropdown-item my-auto">{account}</p></li>
                  <li><p className="dropdown-item my-auto" onClick={onboard.walletReset}>Log Out</p></li>
                </ul>
              </li>
            </ul>
          </div>
          : <button type="button" className="btn btn-dark" onClick={login}>Connect Wallet</button>
        }
      </div>
    </nav>
  );
};

export default Navbar;

const truncateaccount = (account) => {
  return account.slice(0, 7) + "..." + account.slice(-4);
};
