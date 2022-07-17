import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { EtherProvider } from './src/context/Ether';
import Navigator from './src/navigation';

const App = () => {
  return (
    <NavigationContainer>
      <EtherProvider>
        <Navigator />
      </EtherProvider>
    </NavigationContainer>
  );
};

export default App;
