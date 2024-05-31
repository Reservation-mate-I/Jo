import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MainScreen = ({ navigation, route }) => {
  const handleGym = () => {
    navigation.navigate('GymRvmain');
  };
  const handleBus = () => {
    navigation.navigate('BusScreen');
  };
  const handleRS_Check = () => {
    navigation.navigate('RS_Check');
  };
  const handleUserIdPress = () => {
    navigation.navigate('MyPage', { userId });
  };
  const { userId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>메인 화면</Text>
      <View>
        <TouchableOpacity onPress={handleUserIdPress}>
          {userId === '관리자' ? (
            <Text style={styles.userIdText}>관리자님 환영합니다!</Text>
          ) : (
            <Text style={styles.userIdText}>{userId}님 환영합니다!</Text>
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.GymButton} onPress={handleGym}>
        <Text style={styles.GymButtonText}>체육관</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.BusButton} onPress={handleBus}>
        <Text style={styles.BusButtonText}>버스</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.RS_CheckButton} onPress={handleRS_Check}>
        <Text style={styles.RS_CheckButtonText}>RS_Check</Text>
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
  userIdText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue', // 텍스트를 클릭할 수 있게 표시하기 위해 색상 변경
    textDecorationLine: 'underline', // 밑줄 추가
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
  RS_CheckButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 5,
  },
  RS_CheckButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MainScreen;
