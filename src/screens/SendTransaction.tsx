import React, { useContext } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { EtherContext } from '../context/Ether';

const SendTransactionScreen = () => {
  const { ether } = useContext(EtherContext);
  const walletAddress = ether.wallet?.address ?? '';
  return (
    <SafeAreaView>
      <View style={styles.form}>
        <Text>From</Text>
        <TextInput
          style={styles.textInput}
          value={walletAddress}
          editable={false}
        />
        <View style={styles.swapIconContainer}>
          <Icon name="swap-horizontal-outline" color="#444" size={30} />
        </View>
        <Text>To</Text>
        <TextInput style={styles.textInput} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  form: {
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  swapIconContainer: {
    alignItems: 'center',
  },
  textInput: {
    backgroundColor: 'rgb(220,220,220)',
    marginVertical: 10,
    borderRadius: 8,
  },
});
export default SendTransactionScreen;
