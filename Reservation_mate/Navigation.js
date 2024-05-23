import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import MainScreen from './Main/MainScreen';
import GymRvmain from './Gym/GymRvmain';
import FootballCenter from './Gym/GymCategory/FootballCenter';
import Ground from './Gym/GymCategory/Ground';
import SportsCenter from './Gym/GymCategory/SportsCenter';
import BusScreen from './Bus/BusScreen';
import SignUpScreen from './SignUp/SignUpScreen';
import LoginPage from './LoginPage';
import MyPage from './MyPage/MyPage';
import RS_Check from './RS_Check/RS_Check';
import ManagerPage from './Manager/ManagerPage';
import RS_Approval from './Manager/RS_Approval';
import SU_Approval from './Manager/SU_Approval';

const Stack = createStackNavigator();

function StackScreen(){
  return (
    <Stack.Navigator initialRouteName='LoginPage'>
      <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />
      <Stack.Screen name="GymRvmain" component={GymRvmain} options={{ headerShown: false }} />
      <Stack.Screen name="FootballCenter" component={FootballCenter} options={{ headerShown: false }} />
      <Stack.Screen name="Ground" component={Ground} options={{ headerShown: false }} />
      <Stack.Screen name="SportsCenter" component={SportsCenter} options={{ headerShown: false }} />
      <Stack.Screen name="BusScreen" component={BusScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
      <Stack.Screen name="LoginPage" component={LoginPage} options={{ headerShown: false }} />
      <Stack.Screen name="MyPage" component={MyPage} options={{ headerShown: false }} />
      <Stack.Screen name="RS_Check" component={RS_Check} options={{ headerShown: false }} />
      <Stack.Screen name="ManagerPage" component={ManagerPage} options={{ headerShown: false }} />
      <Stack.Screen name="RS_Approval" component={RS_Approval} options={{ headerShown: false }} />
      <Stack.Screen name="SU_Approval" component={SU_Approval} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

function Navigation() {
  return (
    <NavigationContainer>
      <StackScreen/>
    </NavigationContainer>
  )
}

export default Navigation;
