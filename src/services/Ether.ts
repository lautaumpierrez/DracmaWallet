import 'react-native-get-random-values';
import '@ethersproject/shims';
import { Contract, ethers, utils, Wallet } from 'ethers';
import AsyncStorage from '@react-native-community/async-storage';
import env from '../../.env.js';
import DRCBuild from '../../build/contracts/DracmaCoin.json';

export class EtherServices {
  public provider =
    env.setup === 'local'
      ? new ethers.providers.JsonRpcProvider(env.ethers.local_provider)
      : new ethers.providers.EtherscanProvider('ropsten');

  public wallet?: Wallet;
  public contract?: Contract;

  public subscriber: () => void = () => {};

  public async getWalletFromMnemonic(phrase: string): Promise<Wallet> {
    this.wallet = Wallet.fromMnemonic(phrase);
    await this.wallet.connect(this.provider);

    this.loadContract();
    await AsyncStorage.setItem('mnemonic_phrase', phrase);
    this.subscriber();
    return this.wallet;
  }

  private loadContract() {
    this.contract = new ethers.Contract(
      env.ethers.dracma_address,
      DRCBuild.abi,
      this.provider,
    );
  }

  public async generateWallet(): Promise<Wallet> {
    this.wallet = await Wallet.createRandom();
    await this.wallet.connect(this.provider);
    await AsyncStorage.setItem('mnemonic_phrase', this.wallet.mnemonic.phrase);

    this.loadContract();
    this.subscriber();
    return this.wallet;
  }
  public async loadSetup(): Promise<Wallet | undefined> {
    const mnemonicPhrase = await AsyncStorage.getItem('mnemonic_phrase');
    console.log(mnemonicPhrase);
    if (mnemonicPhrase) {
      await this.getWalletFromMnemonic(mnemonicPhrase);
    }
    return this.wallet;
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
      return this.parseDracmas(dracmasBalance);
    }
    return undefined;
  }

  public async getTransactions() {
    // TODO: make method to map blocks and get transactions history
  }
}

export const etherServices = new EtherServices();
