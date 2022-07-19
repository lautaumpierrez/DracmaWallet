import React, { useCallback, useContext, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NumberFormat from 'react-number-format';

import { primaryColor } from '../constants/tokens';
import { EtherContext } from '../context/Ether';
import FeaturesList from '../components/FeaturesList';

const MemberScreen = () => {
  const { ether } = useContext(EtherContext);
  const { push } = useNavigation<{ push: (value: string) => void }>();

  const [balance, setBalance] = useState<number>();

  const getBalance = async () => {
    const gettedBalance = await ether.getBalance();
    setBalance(gettedBalance ?? 0);
  };

  const showETHBalance = async () => {
    const ethBalance = await ether.getETHBalance();
    Alert.alert('Your ethers balance is', `ETH$${ethBalance}`);
  };
  useFocusEffect(
    useCallback(() => {
      getBalance();
    }, []),
  );

  return (
    <SafeAreaView>
      <View>
        <View style={styles.balanceContainer}>
          <View style={styles.ethereumIconContainer}>
            <TouchableOpacity onPress={showETHBalance}>
              <Image
                source={require('../assets/icons/ethereum.png')}
                style={styles.ethereumIcon}
              />
            </TouchableOpacity>
          </View>
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
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => push('TransactionsHistory')}>
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
          <FeaturesList />
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
    marginTop: 30,
    padding: 20,
  },
  bodyTitle: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 20,
  },

  ethereumIconContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  ethereumIcon: {
    width: 50,
    height: 50,
  },
});
export default MemberScreen;
