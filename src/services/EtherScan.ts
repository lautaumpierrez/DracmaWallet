import env from '../../.env';
import { Transaction } from '../types/Transactions';
import { getFetch } from '../utils/fetch';

export class Etherscan {
  private fetch = getFetch(
    'https://api-ropsten.etherscan.io/api',
    env.etherscan.api_key,
  );

  public async getTransactions(address: string): Promise<Transaction[]> {
    const response = await this.fetch('/', {}, [
      ['module', 'account'],
      ['action', 'tokentx'],
      ['contractaddress', env.ethers.dracma_address],
      ['address', address],
      ['startblock', '0'],
      ['endblock', '99999999'],
    ]);
    const { result } = await response.json();
    return result;
  }
}

export const etherscanServices = new Etherscan();
