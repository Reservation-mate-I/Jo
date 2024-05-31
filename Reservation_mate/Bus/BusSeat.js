import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BusSeat = () => {
  const [seatStatus, setSeatStatus] = useState(Array(45).fill(false));
  const [selectedSeat, setSelectedSeat] = useState(null);
  const navigation = useNavigation(); // Navigation hook 사용

  const handleSeatPress = (index) => {
    if (seatStatus[index]) {
      // 이미 선택된 좌석을 다시 클릭한 경우 선택 해제
      setSeatStatus((prevSeatStatus) => {
        const newSeatStatus = [...prevSeatStatus];
        newSeatStatus[index] = false;
        return newSeatStatus;
      });
      setSelectedSeat(null);
    } else {
      // 다른 좌석을 선택한 경우 기존 선택 해제하고 현재 좌석 선택
      setSeatStatus((prevSeatStatus) => {
        const newSeatStatus = [...prevSeatStatus].fill(false);
        newSeatStatus[index] = true;
        return newSeatStatus;
      });
      setSelectedSeat(index);
    }
  };

  const handleComplete = () => {
    if (selectedSeat !== null) {
      const seatNumber = selectedSeat + 1;
      Alert.alert(
        '알림',
        `00시 버스의 ${seatNumber}번 좌석을 예약하시겠습니까?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'OK', onPress: () => { handleReservation(seatNumber); navigation.navigate('BusReservation'); } }, // OK 누를 때 화면 이동
        ]
      );
    } else {
      Alert.alert('알림', '좌석을 선택해주세요.');
    }
  };

  const handleReservation = (seatNumber) => {
    setSeatStatus((prevSeatStatus) => {
      const newSeatStatus = [...prevSeatStatus];
      newSeatStatus[seatNumber - 1] = true;
      return newSeatStatus;
    });
    setSelectedSeat(null);
    Alert.alert('알림', `예약이 완료되었습니다. ${seatNumber}번 좌석`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>버스 좌석 예약</Text>
      <View style={styles.seatContainer}>
        {seatStatus.map((isReserved, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.seat,
              { backgroundColor: isReserved ? 'red' : (selectedSeat === index ? 'blue' : 'green') }
            ]}
            onPress={() => handleSeatPress(index)}
            disabled={isReserved}
          >
            <Text style={styles.seatText}>{index + 1}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
        <Text style={styles.completeButtonText}>선택 완료</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  seatContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  seat: {
    width: 50,
    height: 50,
    margin: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seatText: {
    color: 'white',
    fontWeight: 'bold',
  },
  completeButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  completeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BusSeat;