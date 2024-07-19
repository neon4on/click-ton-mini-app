import { TonClient, WalletContractV4, internal } from 'ton';
import { mnemonicToPrivateKey } from 'ton-crypto';

const CLICKER_CONTRACT_ADDRESS = 'YOUR_DEPLOYED_CONTRACT_ADDRESS';

class TonService {
  constructor() {
    this.client = new TonClient({
      endpoint: 'https://toncenter.com/api/v2/jsonRPC',
    });
  }

  async getWallet(mnemonic) {
    const key = await mnemonicToPrivateKey(mnemonic.split(' '));
    return WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 });
  }

  async mine(wallet) {
    const contract = this.client.open(CLICKER_CONTRACT_ADDRESS);
    const message = internal({
      to: CLICKER_CONTRACT_ADDRESS,
      value: '0.01', // Adjust the value as needed
      body: { op: 0x1234 }, // op::mine
    });
    return wallet.send(message);
  }

  async transfer(wallet, toAddress, amount) {
    const contract = this.client.open(CLICKER_CONTRACT_ADDRESS);
    const message = internal({
      to: CLICKER_CONTRACT_ADDRESS,
      value: '0.01', // Adjust the value as needed
      body: {
        op: 0x5678, // op::transfer
        to: toAddress,
        amount: amount,
      },
    });
    return wallet.send(message);
  }

  async getUserBalance(address) {
    const contract = this.client.open(CLICKER_CONTRACT_ADDRESS);
    return contract.getMethod('get_user_balance', [address]);
  }
}

export const tonService = new TonService();
