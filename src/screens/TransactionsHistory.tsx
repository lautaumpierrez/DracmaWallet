import React, { useCallback, useContext, useState } from 'react';
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { etherscanServices } from '../services/EtherScan';
import { EtherContext } from '../context/Ether';
import Loader from '../components/Loader';
import TransactionCard from '../components/TransactionCard';
import { Transaction } from '../types/Transactions';

const TransactionsHistoryScreen = () => {
  const { ether } = useContext(EtherContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [transactions, setTransactions] = useState<any[]>([]);

  const getTransactionsHistory = async () => {
    try {
      const gettedTransactions = await etherscanServices.getTransactions(
        ether.wallet?.address ?? '',
      );

      setTransactions(gettedTransactions.reverse());
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      Alert.alert(
        'Something went wrong',
        'We had problems getting the transactions history',
      );
    }
  };
  useFocusEffect(
    useCallback(() => {
      getTransactionsHistory();
    }, []),
  );

  return (
    <SafeAreaView>
      <Loader isLoading={isLoading}>
        <View style={styles.body}>
          <FlatList<Transaction>
            data={transactions}
            renderItem={({ item }) => <TransactionCard {...item} />}
          />
        </View>
      </Loader>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});
export default TransactionsHistoryScreen;
