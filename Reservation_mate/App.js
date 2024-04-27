import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './LoginPage';
import MainScreen from './Main/MainScreen';
import GymScreen from './Gym/GymScreen';
import BusScreen from './Bus/BusScreen';
import SignUpScreen from './SignUp/SignUpScreen';
import { useUser, UserProvider } from './UserContext';
import { getDatabase, ref, get } from 'firebase/database';

const Stack = createStackNavigator();

export const loginUser = async (id, password) => {
  try {
      const db = getDatabase();
      const userRef = ref(db, 'users/' + id);
      const snapshot = await get(userRef);

      return snapshot.exists() && snapshot.val().password === password;
  } catch (error) {
      console.error("Error logging in: ", error);
      throw error;
  }
};

const App = () => {
  return (
    <UserProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginPage">
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GymScreen"
          component={GymScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BusScreen"
          component={BusScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </UserProvider>
  );
};

export default App;
