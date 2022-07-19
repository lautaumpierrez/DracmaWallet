import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { EtherContext } from '../context/Ether';

const FeaturesList = () => {
  const { ether } = useContext(EtherContext);
  const { push, replace } =
    useNavigation<Record<string, (value: string) => void>>();

  const lockWallet = () => {
    ether.forgetWallet();
    replace('Home');
  };

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => push('SendTransaction')}>
        <View style={styles.feature}>
          <Image
            style={styles.featureIcon}
            source={require('../assets/icons/send_money.png')}
          />
          <Text style={styles.featureText}>Send transaction</Text>
          <Icon
            style={styles.featureGoIcon}
            name="chevron-forward-outline"
            color="#444"
            size={30}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.7} onPress={lockWallet}>
        <View style={styles.feature}>
          <Image
            style={{
              ...styles.featureIcon,
              width: 50,
              height: 50,
              marginLeft: 20,
            }}
            source={require('../assets/icons/lock.png')}
          />
          <Text style={styles.featureText}>Lock wallet</Text>
          <Icon
            style={styles.featureGoIcon}
            name="chevron-forward-outline"
            color="#444"
            size={30}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  feature: {
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
    marginVertical: 10,
  },
  featureIcon: {
    width: 80,
    height: 80,
  },
  featureText: {
    fontSize: 20,
    flexGrow: 1,
    textAlign: 'center',
  },
  featureGoIcon: {
    paddingHorizontal: 10,
  },
});

export default FeaturesList;
