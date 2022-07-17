import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, MemberScreen } from '../screens/';

const Stack = createNativeStackNavigator();
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
    </Stack.Navigator>
  );
};

export default Navigator;
