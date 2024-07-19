import React, { useState, useEffect } from 'react';
import { useTonConnect } from './hooks/useTonConnect';
import { tonService } from './services/ton';
import Header from './components/Header/Header';
import Button from './components/Button/Button';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  const [coinCount, setCoinCount] = useState(0);
  const { connected, wallet } = useTonConnect();

  useEffect(() => {
    if (connected && wallet) {
      tonService.getUserBalance(wallet.account.address).then(setCoinCount);
    }
  }, [connected, wallet]);

  const handleClick = async () => {
    if (connected && wallet) {
      await tonService.mine(wallet);
      const newBalance = await tonService.getUserBalance(wallet.account.address);
      setCoinCount(newBalance);
    } else {
      console.error('Wallet not connected');
    }
  };

  const handleSendTokens = async () => {
    if (connected && wallet) {
      // Here you should implement a UI to get the recipient's address and amount
      const toAddress = prompt("Enter recipient's address:");
      const amount = prompt('Enter amount to send:');
      if (toAddress && amount) {
        await tonService.transfer(wallet, toAddress, parseInt(amount));
        const newBalance = await tonService.getUserBalance(wallet.account.address);
        setCoinCount(newBalance);
      }
    } else {
      console.error('Wallet not connected');
    }
  };

  return (
    <div className="App">
      <Header coinCount={coinCount} />
      <main className="App-main">
        <Button className="click-button" onClick={handleClick} disabled={!connected}>
          Tap to Mine
        </Button>
      </main>
      <Footer onSendTokens={handleSendTokens} connected={connected} />
    </div>
  );
}

export default App;
