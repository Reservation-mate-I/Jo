import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useUser, UserProvider } from '../UserContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import firebaseService from '../Database/firebaseService'; // 호환성 모듈 import

const RS_Check = () => {
  const { userId } = useUser(); 
  const navigation = useNavigation();
  const [reservationData, setReservationData] = useState(null); // 예약 데이터 상태

  useEffect(() => {
    if (userId) {
      // 파이어베이스에서 userId에 해당하는 예약 데이터 가져오기
      const reservationRef = firebaseService.ref('reservations/' + userId);
      reservationRef.once('value', snapshot => {
        const data = snapshot.val();
        setReservationData(data);
      });
    }
  }, [userId]);

  // 로딩 중일 때 표시할 화면
  if (!reservationData) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  // 예약 내역이 있을 때 표시할 화면
  return (
    <UserProvider>
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View>
            <Icon name="ios-arrow-back" size={35}/> 
          </View>
        </TouchableOpacity>
      </View>
      
      <View>
        <View>
          <Text>국립 강릉원주대학교</Text>
          <Text>GANGNEUNG-WONJU NATIONAL UNIVERSITY</Text>
        </View>
        <View>
          <View>{userId && <Text>{`${userId}님의 예약내역`}</Text>}
          </View>
        </View>

        {/* 예약 내역 표시 */}
        {reservationData.map((reservation, index) => (
          <View key={index} style={{ padding: 20, backgroundColor: 'lightgray', margin: 10 }}>
            <Text>No.{index + 1}</Text>
            <Text>{reservation.title}</Text>
            <Text>일정</Text>
            <Text>{reservation.schedule}</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => handleReservationChange(index)}>
                <View style={{ padding: 5, backgroundColor: 'lightblue'}}>
                  <Text>예약 변경</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleReservationCancel(index)}>
                <View style={{ padding: 5, backgroundColor: 'lightgreen'}}>
                  <Text>예약 취소</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </UserProvider>
  );
};

export default RS_Check;
