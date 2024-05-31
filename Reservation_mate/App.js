import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import GuestLoginScreen from '../screens/GuestLoginScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import SignupScreen from '../screens/SignupScreen';
import PasswordChangeScreen from '../screens/PasswordChangeScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="뒤로가기">
        <Stack.Screen name="뒤로가기" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="GuestLogin"
          component={GuestLoginScreen}
          options={{
            headerTitle: '', // 헤더 타이틀을 빈 문자열로 설정하여 숨김
            headerTransparent: true, // 헤더 배경을 투명하게 설정
          }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{
            headerTitle: '', // 헤더 타이틀을 빈 문자열로 설정하여 숨김
            headerTransparent: true, // 헤더 배경을 투명하게 설정
          }} />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{
            headerTitle: '', // 헤더 타이틀을 빈 문자열로 설정하여 숨김
            headerTransparent: true, // 헤더 배경을 투명하게 설정
          }} />
          <Stack.Screen
          name="PasswordChange"
          component={PasswordChangeScreen}
          options={{
            headerTitle: '', // 헤더 타이틀을 빈 문자열로 설정하여 숨김
            headerTransparent: true, // 헤더 배경을 투명하게 설정
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}