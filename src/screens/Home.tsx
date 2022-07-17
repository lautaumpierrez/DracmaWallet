import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  ActivityIndicator,
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

const HomeScreen = () => {
  const { ether, wallet: asyncWallet } = useContext(EtherContext);
  const navigation = useNavigation();
  const [importWallet, setImportWallet] = useState<boolean>(false);
  const [phrase, setPhrase] = useState<string>('');
  const [generatedWallet, setGeneratedWallet] = useState<{
    address: string;
    mnemonic: string;
  }>({ address: '', mnemonic: '' });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toggleImportWallet = () => setImportWallet(prevState => !prevState);

  const onPhraseChange = (value: string) => setPhrase(value);

  const importWalletFromMnemonic = async () => {
    try {
      setIsLoading(true);
      const wallet = await ether.getWalletFromMnemonic(phrase);
      setIsLoading(false);
      Alert.alert('Welcome to Dracma Coin Wallet');

      console.log(wallet);
    } catch (e) {
      setIsLoading(false);
      Alert.alert('Invalid mnemonic phrase');
      setPhrase('');
      setImportWallet(false);
    }
  };

  const generateWallet = () => {
    try {
      setIsLoading(true);
      const wallet = ether.generateWallet();
      setGeneratedWallet({
        address: wallet.address,
        mnemonic: wallet.mnemonic.phrase,
      });
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);

      Alert.alert('An error has ocurred');
    }
  };

  useEffect(() => {
    console.log(asyncWallet);
    if (asyncWallet) {
      navigation.navigate('Member' as never);
    }
  }, [asyncWallet, navigation]);

  return (
    <SafeAreaView style={styles.outerContainer}>
      <View style={styles.container}>
        <Image
          source={require('../assets/icons/wallet.png')}
          style={styles.walletImage}
        />
        <Text style={styles.title}>Dracma Wallet</Text>
        <ActivityIndicator
          animating={true}
          style={styles.loader}
          size="large"
          color="#27ae60"
        />

        {generatedWallet.address ? (
          <View>
            <Text>Your wallet address is: {generatedWallet.address}</Text>
            <Text>
              Your wallet mnemonic phrase is:
              {generatedWallet.mnemonic}
            </Text>
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
                  onPress={importWalletFromMnemonic}
                  title="Lets import"
                />
              </View>
            )}
          </React.Fragment>
        )}
      </View>
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
    backgroundColor: '#27ae60',
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
  loader: {
    opacity: 1,
  },
});
export default HomeScreen;
