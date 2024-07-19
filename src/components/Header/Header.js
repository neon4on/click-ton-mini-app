import React from 'react';
import './Header.css';

const Header = ({ coinCount }) => (
  <header className="header">
    <h1>TON Clicker</h1>
    <p className="coin-count">Coins: {coinCount}</p>
  </header>
);

export default Header;
