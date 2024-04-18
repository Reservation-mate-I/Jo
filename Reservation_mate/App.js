import React from 'react';
import { View, Text, TextInput,TouchableOpacity, StyleSheet, ImageBackground} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';

const Stack = createStackNavigator();

const MainScreen = () => {
    const handleLogin = () => {
      };
  return (
    <View style={styles.container}>
      <LinearGradient style={styles.headerContainer} colors={['#ffffff', '#000000']}>
        <View style={styles.imageContainer}>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textStyle}>국립 강릉원주대학교</Text>
          <Text style={styles.subHeader}>GANGNEUNG-WONJU NATIONAL UNIVERSITY</Text>
        </View>
        <View style={styles.spacer}/>
      </LinearGradient>
      <View style={styles.bodyContainer}>
        <View style={styles.bodyTopContainer}>
        </View>
        <View style={styles.bodyMiddleContainer}>
          <View style={styles.IDbottom}>
            <TextInput style={styles.input} placeholder="아이디"/>
            <TextInput style={styles.input} placeholder="비밀번호" secureTextEntry={true}/>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>로그인</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bodyBottomContainer}/>
      </View>
      <View style={styles.bottomImageContainer}>
      </View>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
});

export default App;