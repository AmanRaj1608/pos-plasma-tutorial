import React from "react";

const Navbar = ({ account, onboard }) => {

  const login = async (e) => {
    e.preventDefault();
    await onboard.walletSelect();
    await onboard.walletCheck();
    console.log(onboard.getState().balance);
  }

  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-5">
      <div class="container-fluid" style={{ maxWidth: 1400 }}>
        <p class="navbar-brand my-auto">Ethereum - Matic Bridge</p>
        {account ?
          <div class="" id="navbarNavDarkDropdown">
            <ul class="navbar-nav">
              <li class="nav-item dropdown">
                <p class="nav-link dropdown-toggle my-auto" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {truncateaccount(account)}
                </p>
                <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                  <li><p class="dropdown-item my-auto">{account}</p></li>
                  <li><p class="dropdown-item my-auto" onClick={onboard.walletReset}>Log Out</p></li>
                </ul>
              </li>
            </ul>
          </div>
          : <button type="button" class="btn btn-dark" onClick={login}>Connect Wallet</button>
        }
      </div>
    </nav>
  );
};

export default Navbar;

const truncateaccount = (account) => {
  return account.slice(0, 7) + "..." + account.slice(-4);
};
