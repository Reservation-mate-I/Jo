import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MainScreen = ({ navigation }) => {
  const handleGym = () => {
    navigation.navigate('GymScreen');
  };
  const handleBus = () => {
    navigation.navigate('BusScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>메인 화면</Text>
      <Text>메인 화면 컨텐츠...</Text>
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
