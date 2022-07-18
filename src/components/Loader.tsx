import React from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native';
import { primaryColor } from '../constants/tokens';

const Loader: React.FC<{ children: JSX.Element; isLoading: boolean }> = ({
  children,
  isLoading,
}) => {
  return isLoading ? (
    <View style={styles.container}>
      <View>
        <ActivityIndicator
          animating={true}
          style={styles.loader}
          size={'large'}
          color={primaryColor}
        />
      </View>
    </View>
  ) : (
    children
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    backgroundColor: 'rgba(0,0,0, .5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
  },
  loader: {
    opacity: 1,
    transform: [{ scale: 2 }],
  },
});

export default Loader;
