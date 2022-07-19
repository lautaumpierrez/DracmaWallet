import React, { useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { EtherContext } from '../context/Ether';
import { Transaction } from '../types/Transactions';

const TransactionCard = ({ to, value, from, tokenSymbol }: Transaction) => {
  const { ether } = useContext(EtherContext);

  const walletAddress = (ether.wallet?.address ?? '').toLowerCase();

  return (
    <View style={styles.transactionsListItem}>
      <View style={styles.transactionThirdAddress}>
        <Text style={styles.transactionThirdAddressWho}>
          {from === walletAddress ? 'To' : 'From'}
        </Text>
        <Text>{from === walletAddress ? to : from}</Text>
      </View>

      <View
        style={[
          styles.transactionAmountContainer,
          from === walletAddress ? styles.substraction : styles.addition,
        ]}>
        <View>
          <Text style={styles.transactionCurrency}>{tokenSymbol}</Text>
          <Text style={styles.transactionAmount}>
            ${ether.parseDracmas(value)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  transactionThirdAddress: {
    flex: 1,
    justifyContent: 'center',
    padding: 15,
  },
  transactionThirdAddressWho: {
    fontSize: 18,
    color: '#999  ',
    fontWeight: '700',
    marginBottom: 7,
  },
  transactionsListItem: {
    height: 150,
    borderRadius: 8,
    marginVertical: 10,
    flexDirection: 'row',
    flex: 1,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  transactionAmountContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  substraction: {
    backgroundColor: '#c0392b',
  },
  addition: {
    backgroundColor: '#27ae60',
  },
  transactionCurrency: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  transactionAmount: {
    color: '#fff',
    fontSize: 25,
    fontWeight: '700',
  },
  transactionSymbol: {
    position: 'absolute',
    top: 30,
    left: -15,
  },
});

export default TransactionCard;
