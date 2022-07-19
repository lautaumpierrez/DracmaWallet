import 'react-native-get-random-values';
import '@ethersproject/shims';
import { Contract, ethers, utils, Wallet, BigNumber } from 'ethers';
import AsyncStorage from '@react-native-community/async-storage';
import env from '../../.env.js';
import DRCBuild from '../../build/contracts/DracmaCoin.json';
import { SendTransactionFormState } from '../types/Transactions.js';

export class EtherServices {
  public provider =
    env.setup === 'local'
      ? new ethers.providers.JsonRpcProvider(env.ethers.local_provider)
      : new ethers.providers.EtherscanProvider('ropsten');

  public wallet?: Wallet;
  public contract?: Contract;
  public walletBalance?: number;

  public subscriber: () => void = () => { };

  // * Account
  public async getWalletFromMnemonic(phrase: string): Promise<Wallet> {
    this.wallet = Wallet.fromMnemonic(phrase);
    this.wallet = await this.wallet.connect(this.provider);
    this.loadContract();
    await AsyncStorage.setItem('mnemonic_phrase', phrase);
    this.subscriber();
    return this.wallet;
  }

  private loadContract() {
    this.contract = new ethers.Contract(
      env.ethers.dracma_address,
      DRCBuild.abi,
      this.wallet,
    );
  }

  public async generateWallet(): Promise<Wallet> {
    this.wallet = await Wallet.createRandom();
    this.wallet = await this.wallet.connect(this.provider);
    await AsyncStorage.setItem('mnemonic_phrase', this.wallet.mnemonic.phrase);

    this.loadContract();
    this.subscriber();
    return this.wallet;
  }
  public async loadSetup(): Promise<Wallet | undefined> {
    const mnemonicPhrase = await AsyncStorage.getItem('mnemonic_phrase');
    if (mnemonicPhrase) {
      await this.getWalletFromMnemonic(mnemonicPhrase);
    }
    return this.wallet;
  }
  public async forgetWallet() {
    await AsyncStorage.removeItem('mnemonic_phrase');
    this.wallet = undefined;
  }
  public subscribe(sub: () => void) {
    this.subscriber = sub;
  }

  // * Balances
  public parseDracmas(value: ethers.BigNumberish): number {
    return parseFloat(utils.formatUnits(value, 18));
  }

  public async getBalance(): Promise<number | undefined> {
    if (this.contract && this.wallet) {
      const dracmasBalance = await this.contract.balanceOf(this.wallet.address);
      this.walletBalance = this.parseDracmas(dracmasBalance);
      return this.parseDracmas(dracmasBalance);
    }
    return undefined;
  }
  public async getETHBalance(): Promise<string | undefined> {
    if (this.wallet) {
      const balance = await this.wallet.getBalance();
      return ethers.utils.formatEther(balance);
    }
    return undefined;
  }

  public async getGasPrice() {
    const gasPrice = await this.provider.getGasPrice();
    return gasPrice;
  }

  public etherFormat(value: BigNumber): string {
    return ethers.utils.formatEther(value);
  }
  // * Transactions
  public async getTransactions() {
    // TODO: make method to map blocks and get transactions history
  }

  public async sendTransaction({ to, amount }: SendTransactionFormState) {
    const result = await this.contract?.transfer(
      to,
      ethers.utils.parseUnits(amount.toString(), 18),
    );

    return result;
  }
}

export const etherServices = new EtherServices();
