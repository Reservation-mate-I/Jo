import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './Main/MainScreen';
import LoginPage from './LoginPage';
import GymScreen from './Gym/GymScreen';
import BusScreen from './Bus/BusScreen';
import SignUpScreen from './SignUp/SignUpScreen';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginPage" component={LoginPage} options={{ headerShown: false }} />
      <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />
      <Stack.Screen name="GymScreen" component={GymScreen} options={{ headerShown: false }} />
      <Stack.Screen name="BusScreen" component={BusScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default Navigation;
