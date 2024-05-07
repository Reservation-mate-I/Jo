import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useUser, UserProvider } from '../../UserContext';
import DatePicker from '../DandT/Date/DatePicker';
import STimePicker from '../DandT/Time/STimePicker'; 
import ETimePicker from '../DandT/Time/ETimePicker';
import { getDatabase, ref, set, get } from 'firebase/database';

const Ground = () => {
  const { userId } = useUser();
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedStartTime, setSelectedStartTime] = useState('');
  const [selectedEndTime, setSelectedEndTime] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [showStartTimeModal, setShowStartTimeModal] = useState(false); 
  const [showEndTimeModal, setShowEndTimeModal] = useState(false); 

  const handleDateSelection = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const handleStartTimeSelection = (startTime) => {
    setSelectedStartTime(startTime);
    setShowStartTimeModal(false);
  };

  const handleEndTimeSelection = (endTime) => {
    setSelectedEndTime(endTime);
    setShowEndTimeModal(false);
  };

  const handleReservation = async () => {
    if (!selectedDate || !selectedStartTime || !selectedEndTime) {
      Alert.alert('알림', '날짜와 시간을 선택해주세요!');
      return;
    }
    try {
      const db = getDatabase();
      const RSDataRef = ref(db, `reservations/RSData/${userId}`);
      const snapshot = await get(RSDataRef);
      const reservationData = snapshot.val();
  
      // 만약 이전 예약 데이터가 존재하는 경우 예약을 막고 경고를 표시합니다.
      if (reservationData) {
        Alert.alert('알림', '이미 예약한 내역이 있습니다. 새로운 예약을 진행할 수 없습니다.');
        return;
      }
    } catch (error) {
      console.error("Error checking existing reservation:", error);
      Alert.alert('알림', '예약 확인 중 오류가 발생했습니다. 다시 시도해주세요.');
      return;
    }
  
    const formattedDate = selectedDate;
    const reservationData = {
      [userId]: selectedStartTime + '-' + selectedEndTime,
    };
    const RSTime = selectedStartTime + '-' + selectedEndTime;
    const RSFLocation = "Ground";
    const RSData = {
      Date: selectedDate, 
      Time: RSTime,
    };
  
    try {
      const db = getDatabase();
      const reservationRef = ref(db, 'reservations/' + 'Ground/' + formattedDate);
      const RSDataRef = ref(db, `reservations/RSData/${userId}/${RSFLocation}`);
      await set(reservationRef, reservationData);
      await set(RSDataRef, RSData);
      
      Alert.alert('알림', '예약이 성공적으로 완료되었습니다!');
    } catch (error) {
      console.error(error);
      Alert.alert('알림', '예약 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <UserProvider>
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="ios-arrow-back" size={100}/> 
        </TouchableOpacity>
      </View>
      <View>
        <Text>국립 강릉원주대학교</Text>
        <Text>GANGNEUNG-WONJU NATIONAL UNIVERSITY</Text>
        <Text>운동장</Text>
        <TouchableOpacity onPress={() => setShowCalendar(true)}>
          <View style={styles.Sbox}><Text>날짜</Text></View>
        </TouchableOpacity>
        {showCalendar && (
          <DatePicker
            onSelectDate={handleDateSelection}
            onClose={() => setShowCalendar(false)}
          />
        )}
        <View style={styles.Sbox}>{selectedDate && <Text>{selectedDate}</Text>}</View>
        <View style={styles.Sbox}><Text>시간</Text></View>
        <TouchableOpacity onPress={() => setShowStartTimeModal(true)}>
          <View style={styles.Tbox}><Text>시작</Text></View>
        </TouchableOpacity>
        <View style={styles.Sbox}><Text>{selectedStartTime}</Text></View>
        <TouchableOpacity onPress={() => setShowEndTimeModal(true)}>
          <View style={styles.Tbox}><Text>종료</Text></View>
        </TouchableOpacity>
        <View style={styles.Sbox}><Text>{selectedEndTime}</Text></View>
      </View>
      <STimePicker
        visible={showStartTimeModal}
        onClose={() => setShowStartTimeModal(false)}
        onSelectTime={handleStartTimeSelection}
      />
      <ETimePicker
        visible={showEndTimeModal}
        onClose={() => setShowEndTimeModal(false)}
        onSelectTime={handleEndTimeSelection}
      />
      <TouchableOpacity style={styles.Rbox} onPress={handleReservation}>
        <Text>예약</Text>
      </TouchableOpacity>
    </UserProvider>
  );
};



const styles = StyleSheet.create({
  Sbox: {
    width: 300,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
  },
  Tbox: {
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
  },
  TSbox: {
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
  },
  Rbox: {
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
  },
  box: {
    width: 300,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
  },
});

export default Ground;
