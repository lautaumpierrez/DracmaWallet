import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EtherContext } from '../context/Ether';
import Loader from '../components/Loader';
import { useNavigation } from '@react-navigation/native';
import wait from '../utils/wait';
import { primaryColor } from '../constants/tokens';

const HomeScreen = () => {
  const { ether } = useContext(EtherContext);
  const { replace } = useNavigation<{ replace: (value: string) => void }>();

  const [importWallet, setImportWallet] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [phrase, setPhrase] = useState<string>('');
  const [generatedWallet, setGeneratedWallet] = useState<{
    address: string;
    mnemonic: string;
  }>({ address: '', mnemonic: '' });

  const toggleImportWallet = () => setImportWallet(prevState => !prevState);

  const onPhraseChange = (value: string) => setPhrase(value);

  const importWalletFromMnemonic = async () => {
    setIsLoading(true);

    // ! Find a better way to prevent ethers freeze rendering process.
    wait(async () => {
      try {
        const wallet = await ether.getWalletFromMnemonic(phrase);
        if (wallet) {
          setIsLoading(false);
          await Alert.alert('Welcome to Dracma Coin Wallet');

          replace('Member');
        }
      } catch (e) {
        setIsLoading(false);
        Alert.alert('Invalid mnemonic phrase');
        setPhrase('');
        setImportWallet(false);
      }
    }, 1500);
  };

  const generateWallet = () => {
    setIsLoading(true);
    // ! Find a better way to prevent ethers freeze rendering process.
    wait(async () => {
      try {
        const wallet = await ether.generateWallet();
        setGeneratedWallet({
          address: wallet.address,
          mnemonic: wallet.mnemonic.phrase,
        });
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);

        Alert.alert('An error has ocurred');
      }
    }, 1500);
  };

  const loadWallet = async () => {
    await ether.loadSetup();
    if (ether.wallet) {
      replace('Member');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadWallet();
  }, []);
  return (
    <SafeAreaView style={styles.outerContainer}>
      <Loader isLoading={isLoading}>
        <View style={styles.container}>
          <Image
            source={require('../assets/icons/wallet.png')}
            style={styles.walletImage}
          />
          <Text style={styles.title}>Dracma Wallet</Text>

          {generatedWallet.address ? (
            <View style={styles.generatedWalletContainer}>
              <Text style={styles.generatedWalletTitle}>
                Your wallet address is
              </Text>
              <TextInput
                multiline
                value={generatedWallet.address}
                editable={false}
              />
              <Text style={styles.generatedWalletMnemonic}>
                Your wallet mnemonic phrase is:
              </Text>
              <TextInput
                multiline
                value={generatedWallet.mnemonic}
                editable={false}
              />
              <Button
                color={primaryColor}
                title="Let's start"
                onPress={() => replace('Member')}
              />
            </View>
          ) : (
            <React.Fragment>
              <TouchableOpacity onPress={toggleImportWallet}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>
                    {importWallet ? 'Cancel Import' : 'Import wallet'}
                  </Text>
                </View>
              </TouchableOpacity>
              {!importWallet && (
                <TouchableOpacity onPress={generateWallet}>
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>Create new Wallet</Text>
                  </View>
                </TouchableOpacity>
              )}

              {importWallet && (
                <View>
                  <TextInput
                    style={styles.inputPhrase}
                    placeholder="Input mnenomic phrase"
                    multiline
                    onChangeText={onPhraseChange}
                    value={phrase}
                  />
                  <Button
                    color={primaryColor}
                    onPress={importWalletFromMnemonic}
                    title="Let's import"
                  />
                </View>
              )}
            </React.Fragment>
          )}
        </View>
      </Loader>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  walletImage: {
    width: Dimensions.get('screen').width / 3,
    height: Dimensions.get('screen').width / 3,
  },
  title: {
    marginVertical: 20,
    fontSize: 40,
    fontWeight: '700',
  },
  button: {
    backgroundColor: primaryColor,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    shadowColor: 'red',
    marginVertical: 15,
    width: Dimensions.get('screen').width * 0.8,
    textAlign: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  inputPhrase: {
    backgroundColor: 'rgb(220,220,220)',
    minHeight: 200,
    width: Dimensions.get('screen').width * 0.8,
    borderRadius: 8,
    paddingVertical: 30,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  generatedWalletContainer: {
    paddingHorizontal: 30,
  },
  generatedWalletTitle: {
    fontSize: 22,
  },
  generatedWalletMnemonic: {
    fontSize: 20,
  },
});
export default HomeScreen;
