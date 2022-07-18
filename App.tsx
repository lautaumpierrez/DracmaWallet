import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { EtherProvider } from './src/context/Ether';
import Navigator from './src/navigation';
import { primaryColor } from './src/constants/tokens';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={primaryColor} barStyle="light-content" />
      <EtherProvider>
        <Navigator />
      </EtherProvider>
    </NavigationContainer>
  );
};

export default App;
