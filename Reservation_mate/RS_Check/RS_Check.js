import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useUser } from '../UserContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import firebaseService from '../Database/firebaseService';
import { getDatabase, ref, get, remove } from 'firebase/database';

const RS_Check = () => {
  const { userId } = useUser();
  const navigation = useNavigation();
  const [reservationData, setReservationData] = useState(null);

  useEffect(() => {
    if (userId) {
      const fetchReservationData = async () => {
        try {
          const db = getDatabase(firebaseService);
          const snapshot = await get(ref(db, `reservations/RSData/${userId}`));
          const data = snapshot.val();
          if (data) {
            const reservations = Object.entries(data).map(([location, reservation]) => ({
              location,
              ...reservation,
            }));
            setReservationData(reservations);
          } else {
            setReservationData([]);
          }
        } catch (error) {
          console.error("예약 데이터를 불러오는 중 오류가 발생했습니다:", error);
        }
      };

      fetchReservationData();
    }
  }, [userId]);

  const handleReservationChange = (index) => {
    const selectedReservation = reservationData[index];
    switch (selectedReservation.location) {
      case 'FootballCenter':
        navigation.navigate('FootballCenter');
        break;
      case 'Ground':
        navigation.navigate('Ground');
        break;
      case 'SportsCenter':
        navigation.navigate('SportsCenter');
        break;
      default:
        break;
    }
  };

  const handleReservationCancel = async (index) => {
    try {
      const db = getDatabase(firebaseService);
      const reservationToRemove = reservationData[index];
      const formattedDate = reservationToRemove.Date;
      const location = reservationToRemove.location;

      const reservationRef = ref(db, `reservations/${location}/${formattedDate}`);
      const RSDataRef = ref(db, `reservations/RSData/${userId}/${reservationToRemove.location}`);

      await remove(reservationRef);
      await remove(RSDataRef);

      const updatedReservations = [...reservationData];
      updatedReservations.splice(index, 1);
      setReservationData(updatedReservations);

      Alert.alert('알림', '예약이 성공적으로 취소되었습니다!');
    } catch (error) {
      console.error("예약 취소 중 오류가 발생했습니다:", error);
      Alert.alert('알림', '예약 취소 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View>
          <Icon name="arrow-back" size={100}/>
        </View>
      </TouchableOpacity>
      <View>
        <View>
          <Text>국립 강릉원주대학교</Text>
          <Text>GANGNEUNG-WONJU NATIONAL UNIVERSITY</Text>
        </View>
        <View>
          <View>{userId && <Text>{`${userId}님의 예약내역`}</Text>}</View>
        </View>
        {reservationData &&
          reservationData.map((userData, index) => (
            <View key={index}>
              {userData && (
                <View style={{ padding: 20, backgroundColor: 'lightgray', margin: 10 }}>
                  <Text>No.{index + 1}</Text>
                  <Text>{`장소: ${userData.location}`}</Text>
                  <Text>{`일정: ${userData.Date} ${userData.Time}`}</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => handleReservationChange(index)}>
                      <View style={{ padding: 5, backgroundColor: 'lightblue' }}>
                        <Text>예약 변경</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleReservationCancel(index)}>
                      <View style={{ padding: 5, backgroundColor: 'lightgreen' }}>
                        <Text>예약 취소</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          ))}
      </View>
    </View>
  );
};

export default RS_Check;
