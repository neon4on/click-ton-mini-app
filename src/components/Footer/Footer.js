import React from 'react';
import { TonConnectButton } from '@tonconnect/ui-react';
import Button from '../Button/Button';
import './Footer.css';

const Footer = ({ onSendTokens, connected }) => (
  <footer className="footer">
    <TonConnectButton />
    <Button className="send-button" onClick={onSendTokens} disabled={!connected}>
      Send Tokens
    </Button>
  </footer>
);

export default Footer;
