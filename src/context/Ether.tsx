import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import { ethers, Wallet } from 'ethers';
import { EtherServices, etherServices } from '../services/Ether';

const EtherContext = createContext<{
  ether: EtherServices;
  wallet?: ethers.Wallet;
}>({
  wallet: undefined,
  ether: etherServices,
});

const EtherProvider = ({ children }: PropsWithChildren<{}>) => {
  const [wallet, setWallet] = useState<Wallet>();
  const loadPersistedWallet = async () => {
    await etherServices.loadSetup();
  };

  useEffect(() => {
    etherServices.subscribe(() => {
      setWallet(etherServices.wallet);
    });
    setWallet(etherServices.wallet);

    loadPersistedWallet();
  }, []);

  return (
    <EtherContext.Provider value={{ ether: etherServices, wallet }}>
      {children}
    </EtherContext.Provider>
  );
};

export { EtherProvider, EtherContext };
