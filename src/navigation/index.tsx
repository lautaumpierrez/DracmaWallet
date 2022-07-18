import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, MemberScreen, SendTransactionScreen } from '../screens/';
import { primaryColor } from '../constants/tokens';

export type RootStackParams = {
  Home: undefined;
  Member: undefined;
  SendTransaction: undefined;
};

const Stack = createNativeStackNavigator<RootStackParams>();

const Navigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home', headerShown: false }}
      />
      <Stack.Screen
        name="Member"
        component={MemberScreen}
        options={{ title: 'Member', headerShown: false }}
      />
      <Stack.Screen
        name="SendTransaction"
        component={SendTransactionScreen}
        options={{
          title: 'Send transaction',
          headerShown: true,
          headerTintColor: '#fff',
          headerStyle: { backgroundColor: primaryColor },
          headerTitleAlign: 'center'
        }}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
