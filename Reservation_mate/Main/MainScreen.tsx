import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MainScreen = ({ navigation, route }) => {
  const handleGym = () => {
    navigation.navigate('GymRvmain');
  };
  const handleBus = () => {
    navigation.navigate('BusScreen');
  };
  const { userId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>메인 화면</Text>
      <View>
        {userId === '관리자' ? (
          <Text>관리자님 환영합니다!</Text>
        ) : (
          <Text>{userId}님 환영합니다!</Text>
        )}
      </View>
      <TouchableOpacity style={styles.GymButton} onPress={handleGym}>
        <Text style={styles.GymButtonText}>체육관</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.BusButton} onPress={handleBus}>
        <Text style={styles.BusButtonText}>버스</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  GymButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 5,
  },
  GymButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  BusButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 5,
  },
  BusButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MainScreen;
