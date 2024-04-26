import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './Main/MainScreen';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName="MainScreen">
      <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default Navigation;
