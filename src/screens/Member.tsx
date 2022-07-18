import React, { useContext, useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NumberFormat from 'react-number-format';
import Icon from 'react-native-vector-icons/Ionicons';

import { primaryColor } from '../constants/tokens';
import { EtherContext } from '../context/Ether';
import { etherscanServices } from '../services/EtherScan';

const MemberScreen = () => {
  const { ether } = useContext(EtherContext);
  const { push } = useNavigation<{ push: (value: string) => void }>();

  const [balance, setBalance] = useState<number>();

  const getBalance = async () => {
    const gettedBalance = await ether.getBalance();
    await ether.getTransactions();
    await etherscanServices.getTransactions(ether.wallet?.address ?? '');
    setBalance(gettedBalance ?? 0);
  };
  useEffect(() => {
    getBalance();
  }, []);

  return (
    <SafeAreaView>
      <View>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceTitle}>Your balance</Text>
          <View style={styles.balance}>
            <Text style={styles.balanceCurrency}>DRC</Text>
            <NumberFormat
              value={balance}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'$'}
              renderText={(formattedValue: string) => (
                <Text style={styles.balanceAmount}>{formattedValue}</Text>
              )}
            />
          </View>
          <View style={styles.showTransactionsHistoryContainer}>
            <TouchableOpacity activeOpacity={0.8}>
              <View style={styles.showTransactionsHistory}>
                <Text style={styles.showTransactionsHistoryText}>
                  Transactions History
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.body}>
          <Text style={styles.bodyTitle}> New features </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => push('SendTransaction')}>
            <View style={styles.sendTransaction}>
              <Image
                style={styles.sendTransactionIcon}
                source={require('../assets/icons/send_money.png')}
              />
              <Text style={styles.sendTransactionText}>Send transaction</Text>
              <Icon
                style={styles.sendTransactionGoIcon}
                name="chevron-forward-outline"
                color="#444"
                size={30}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  balanceContainer: {
    height: Dimensions.get('screen').height * 0.3,
    backgroundColor: primaryColor,
    display: 'flex',
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: Dimensions.get('screen').height * 0.3 * 0.2,
    position: 'relative',
  },
  balanceTitle: {
    fontSize: 25,
    fontWeight: '300',
    color: '#fff',
  },
  balance: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  balanceCurrency: {
    fontSize: 35,
    fontWeight: '700',
    color: '#fff',
    marginRight: 10,
  },
  balanceAmount: {
    fontSize: 35,
    fontWeight: '700',
    color: '#fff',
  },
  showTransactionsHistoryContainer: {
    position: 'absolute',
    bottom: -25,
    left: 0,
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    width: Dimensions.get('screen').width,
  },
  showTransactionsHistory: {
    backgroundColor: '#34495e',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignSelf: 'flex-start',
  },
  showTransactionsHistoryText: {
    color: '#fff',
  },

  body: {
    marginTop: 20,
    padding: 20,
  },
  bodyTitle: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 20,
  },
  sendTransaction: {
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 10,

    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 20,
    paddingRight: 15,
  },
  sendTransactionIcon: {
    width: 80,
    height: 80,
  },
  sendTransactionText: {
    fontSize: 20,
    flexGrow: 1,
    textAlign: 'center',
  },
  sendTransactionGoIcon: {
    paddingHorizontal: 10,
  },
});
export default MemberScreen;
