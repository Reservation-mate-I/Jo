import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ImageBackground, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const BusSeat = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { time } = route.params;
  const { userId } = route.params; // useUser 훅을 사용하여 userId 상태 가져오기
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [reservedSeats, setReservedSeats] = useState([]);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserUid(userId);
      } else {
        setUserUid(null);
      }
    });

    const fetchReservedSeats = async () => {
      const db = getDatabase();
      const reservationRef = ref(db, `reservations/Buses/${getCurrentDate()}/${time}`);
      onValue(reservationRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const reservedSeatsArray = Object.values(data);
          setReservedSeats(reservedSeatsArray);
        }
      });
    };

    fetchReservedSeats();
  }, [time]);

  const handleSeatSelection = async (seatNumber) => {
    if (reservedSeats.includes(seatNumber)) {
      Alert.alert('알림', '이미 예약된 좌석입니다.');
      return;
    }
    setSelectedSeat(seatNumber);
  };

  const handleReservation = async () => {
    if (!selectedSeat) {
      Alert.alert('알림', '좌석을 선택해주세요!');
      return;
    }

    const busTime = time;
    const formattedDate = getCurrentDate();
    const reservationData = {
      [userId]: selectedSeat,
    };

    try {
      const db = getDatabase();
      const reservationRef = ref(db, `reservations/Buses/${formattedDate}/${busTime}`);
      await set(reservationRef, reservationData);

      Alert.alert('알림', '버스 좌석 예약이 성공적으로 완료되었습니다!');
      console.log(userId);
      navigation.goBack(selectedSeat);
    } catch (error) {
      console.error(error);
      Alert.alert('알림', '예약 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  };

  const renderSeatButtons = () => {
    const seatButtons = [];
    for (let i = 1; i <= 45; i++) {
      const isReserved = reservedSeats.includes(i);
      seatButtons.push(
        <TouchableOpacity
          key={i}
          style={[
            styles.seat,
            selectedSeat === i && styles.selectedSeat,
            isReserved && styles.reservedSeat,
          ]}
          onPress={() => handleSeatSelection(i)}
          disabled={isReserved}
        >
          <Text style={[styles.seatText, isReserved && styles.reservedSeatText]}>{i}</Text>
        </TouchableOpacity>
      );
    }
    return seatButtons;
  };

  return (
    <View>
      <View style={styles.header}>
        <LinearGradient style={styles.headerContainer} colors={['#bfe1fb', '#bfe1fb']}>
          <View style={styles.imageContainer}>
            <ImageBackground
              source={require('../../assets/GWNU-LOGO.png')}
              style={styles.imageStyle}
              resizeMode="contain"
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textStyle}>국립 강릉원주대학교</Text>
            <Text style={styles.subHeader}>GANGNEUNG-WONJU NATIONAL UNIVERSITY</Text>
          </View>
          <View style={styles.spacer} />
        </LinearGradient>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIconContainer}>
          <ImageBackground source={require('../../assets/back-icon.png')} style={styles.backIcon} resizeMode="contain" />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>버스 좌석 예약</Text>
        <View style={styles.seatContainer}>{renderSeatButtons()}</View>
        <TouchableOpacity style={styles.completeButton} onPress={handleReservation}>
          <Text style={styles.completeButtonText}>선택 완료</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    paddingVertical: hp('5%'),
    alignItems: 'center',
  },
  headerContainer: {
    width: '100%',
    height: hp('15%'),
    position: 'absolute',
    flexDirection: 'row',
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: wp('22%'),
    marginLeft: wp('-10%'),
  },
  imageStyle: {
    top: hp('1%'),
    width: wp('16%'),
    height: hp('7%'),
    left: wp('9%'),
  },
  textContainer: {
    width: wp('60%'),
    alignItems: 'center',
  },
  textStyle: {
    fontSize: hp('3%'),
    top: hp('1%'),
    fontWeight: 'bold',
    alignItems: 'center',
    color: '#343a40',
  },
  subHeader: {
    fontSize: hp('1%'),
    top: hp('2%'),
    fontWeight: 'bold',
    color: '#868296',
  },
  backIconContainer: {
    position: 'absolute',
    left: wp('2%'),
    top: hp('5%'),
  },
  backIcon: {
    width: wp('7%'),
    height: hp('7%'),
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: hp('10%'),
    marginBottom: hp('3%'),
  },
  container: {
    alignItems: 'center',
  },
  seatContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: hp('3%'),
  },
  seat: {
    width: wp('10%'),
    height: hp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#60b4f3',
    backgroundColor: '#95cdf7',
    margin: wp('2%'),
  },
  selectedSeat: {
    backgroundColor: 'green',
  },
  reservedSeat: {
    backgroundColor: 'red',
  },
  seatText: {
    color: 'white',
    fontWeight: 'bold',
  },
  reservedSeatText: {
    color: 'white',
  },
  completeButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: hp('3%'),
  },
  completeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BusSeat;
