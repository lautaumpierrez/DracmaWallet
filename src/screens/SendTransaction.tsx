import React, { useCallback, useContext, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

import Loader from '../components/Loader';
import { primaryColor } from '../constants/tokens';
import { EtherContext } from '../context/Ether';
import { SendTransactionFormState } from '../types/Transactions';
import wait from '../utils/wait';

const SendTransactionScreen = () => {
  const { ether } = useContext(EtherContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form, setForm] = useState<SendTransactionFormState>({
    to: '',
    amount: 0,
  });
  const [gasPrice, setGasPrice] = useState('');
  const walletAddress = ether.wallet?.address ?? '';

  const setFormValue = (value: Partial<SendTransactionFormState>) => {
    setForm(prevState => ({ ...prevState, ...value }));
  };

  const sendTransaction = async () => {
    const walletBalance = ether.walletBalance ?? 0;
    if (form.amount <= walletBalance) {
      await Alert.alert(
        'Confirm transaction send',
        'Do you really want to send the current transaction?',
        [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'Accept',
            onPress: () => {
              setIsLoading(true);
              wait(async () => {
                try {
                  await ether.sendTransaction(form);
                  Alert.alert('Transaction', 'Transaction successfully sent');
                  setFormValue({ to: '', amount: 0 });
                  setIsLoading(false);
                } catch (e) {
                  Alert.alert('Error', 'An error has ocurred');
                  setIsLoading(false);
                }
              }, 1500);
            },
            style: 'default',
          },
        ],
      );
    } else {
      Alert.alert("You don't have enough Dracma Coins to transfer");
    }
  };
  const getGasPrice = async () => {
    const gettedGasPrice = await ether.getGasPrice();
    setGasPrice(ether.etherFormat(gettedGasPrice));
  };
  useFocusEffect(
    useCallback(() => {
      getGasPrice();
    }, []),
  );

  return (
    <SafeAreaView>
      <Loader isLoading={isLoading}>
        <View style={styles.form}>
          <Text>From</Text>
          <TextInput
            style={styles.textInput}
            value={walletAddress}
            editable={false}
            textAlign="left"
          />
          <View style={styles.swapIconContainer}>
            <Icon name="swap-horizontal-outline" color="#444" size={30} />
          </View>
          <Text>To</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Receiver wallet address"
            onChangeText={to => setFormValue({ to })}
            value={form.to}
            editable={true}
          />

          <View style={styles.amountInputContainer}>
            <Text style={styles.amountCurrency}>DRC$</Text>
            <TextInput
              keyboardType="numeric"
              style={[styles.textInput, styles.amountInput]}
              editable={true}
              onChangeText={amount => setFormValue({ amount: Number(amount) })}
              value={String(form.amount)}
              clearButtonMode="always"
            />
          </View>
          <Text> Gas Price : ${gasPrice} ETH</Text>

          <View style={styles.sendTransactionButton}>
            <Button
              color={primaryColor}
              title="Send transaction"
              onPress={sendTransaction}
            />
          </View>
        </View>
      </Loader>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  form: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  swapIconContainer: {
    alignItems: 'center',
  },
  textInput: {
    backgroundColor: 'rgb(220,220,220)',
    marginVertical: 10,
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountCurrency: {
    flexShrink: 0,
  },
  amountInput: {
    flex: 1,
  },
  sendTransactionButton: {
    marginTop: 20,
  },
});
export default SendTransactionScreen;
