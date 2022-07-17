import 'react-native-get-random-values';
import '@ethersproject/shims';
import { Contract, ethers, Wallet } from 'ethers';
import AsyncStorage from '@react-native-community/async-storage';
import env from '../../.env.json';
import DRCBuild from '../../build/contracts/DracmaCoin.json';

export class EtherServices {
  public provider = new ethers.providers.JsonRpcProvider(env.ethers.provider);
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
      this.wallet,
    );
  }

  public generateWallet(): Wallet {
    this.wallet = Wallet.createRandom();
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

  subscribe(sub: () => void) {
    this.subscriber = sub;
  }
}

export const etherServices = new EtherServices();
