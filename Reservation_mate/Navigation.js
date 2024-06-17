import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import MainScreen from './Main/MainScreen';
import GymRvmain from './Gym/GymRvmain';
import FootballCenter from './Gym/GymCategory/FootballCenter';
import Ground from './Gym/GymCategory/Ground';
import SportsCenter from './Gym/GymCategory/SportsCenter';
import BusScreen from './Bus/BusScreen';
import MyPage from './MyPage/MyPage';
import RS_Check from './RS_Check/RS_Check';
import ManagerPage from './Manager/ManagerPage';
import RS_Approval from './Manager/RS_Approval';
import SU_Approval from './Manager/SU_Approval';
import BusSeat from './Bus/BusSeat';
import LoginScreen from '../screens/LoginScreen';
import GuestLoginScreen from '../screens/GuestLoginScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import SignupScreen from '../screens/SignupScreen';
import PasswordChangeScreen from './MyPage/PasswordChangeScreen';
import { UserProvider } from './UserContext';

const Stack = createStackNavigator();

function StackScreen(){
  return (
    <Stack.Navigator initialRouteName='LoginScreen'>
      <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />
      <Stack.Screen name="GymRvmain" component={GymRvmain} options={{ headerShown: false }} />
      <Stack.Screen name="FootballCenter" component={FootballCenter} options={{ headerShown: false }} />
      <Stack.Screen name="Ground" component={Ground} options={{ headerShown: false }} />
      <Stack.Screen name="SportsCenter" component={SportsCenter} options={{ headerShown: false }} />
      <Stack.Screen name="BusScreen" component={BusScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ headerShown: false }} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: true }} />
      <Stack.Screen name="MyPage" component={MyPage} options={{ headerShown: false }} />
      <Stack.Screen name="RS_Check" component={RS_Check} options={{ headerShown: false }} />
      <Stack.Screen name="ManagerPage" component={ManagerPage} options={{ headerShown: false }} />
      <Stack.Screen name="RS_Approval" component={RS_Approval} options={{ headerShown: false }} />
      <Stack.Screen name="SU_Approval" component={SU_Approval} options={{ headerShown: false }} />
      <Stack.Screen name="BusSeat" component={BusSeat} options={{ headerShown: false }} />
      <Stack.Screen name="GuestLogin" component={GuestLoginScreen} options={{ headerTitle: '', headerTransparent: true }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerTitle: '', headerTransparent: true }} />
      <Stack.Screen name="Signup" component={SignupScreen} options={{ headerTitle: '', headerTransparent: true }} />
      <Stack.Screen name="PasswordChangeScreen" component={PasswordChangeScreen} options={{ headerTitle: '', headerTransparent: true }} />
    </Stack.Navigator>
  );
};

function Navigation() {
  return (
    <UserProvider>
      <NavigationContainer>
        <StackScreen/>
      </NavigationContainer>
    </UserProvider>
  )
}

export default Navigation;