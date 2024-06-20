import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ImageBackground, Image } from 'react-native';
import { useNavigation, useRoute} from '@react-navigation/native';
import { useUser, UserProvider } from '../../UserContext';
import DatePicker from '../DandT/Date/DatePicker';
import STimePicker from '../DandT/Time/STimePicker'; 
import ETimePicker from '../DandT/Time/ETimePicker';
import { getDatabase, ref, set, get } from 'firebase/database';
import { LinearGradient } from 'expo-linear-gradient';  // expo-linear-gradient import
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const FootballCenter = () => {
  const route = useRoute();
  const { userId } = route.params;
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
    const RSFLocation = "FootballCenter";
    const RSData = {
      Date: selectedDate, 
      Time: RSTime, 
    };
  
    try {
      const db = getDatabase();
      const reservationRef = ref(db, 'reservations/' + 'FootballCenter/' + formattedDate);
      const RSDataRef = ref(db, `reservations/RSData/${userId}/${RSFLocation}`);
      await set(reservationRef, reservationData);
      await set(RSDataRef, RSData);
      
      Alert.alert('알림', '예약이 성공적으로 완료되었습니다!');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('알림', '예약 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <UserProvider>
      <View>
        <View style={styles.header}>
          <LinearGradient style={styles.headerContainer} colors={['#bfe1fb', '#bfe1fb']}>
            <View style={styles.imageContainer}>
              <ImageBackground
                source={require('../../../assets/GWNU-LOGO.png')}
                style={styles.imageStyle}
                resizeMode="contain"
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.textStyle}>국립 강릉원주대학교</Text>
              <Text style={styles.subHeader}>GANGNEUNG-WONJU NATIONAL UNIVERSITY</Text>
            </View>
            <View style={styles.spacer}/>
          </LinearGradient>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIconContainer}>
              <ImageBackground source={require('../../../assets/back-icon.png')}style={styles.backIcon}
                resizeMode="contain"/>
            </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>풋살장</Text>
            <View style={styles.Sbox}><Text>날짜</Text></View>
          <TouchableOpacity onPress={() => setShowCalendar(true)}>
            <View style={styles.S2box}>{selectedDate && <Text>{selectedDate}</Text>}</View>
          </TouchableOpacity>
          {showCalendar && (
            <DatePicker
              onSelectDate={handleDateSelection}
              onClose={() => setShowCalendar(false)}
            />
          )}
          <View style={styles.Sbox}><Text>시간</Text></View>
          <View style={styles.rowContainer}>
          <View style={styles.Tbox}><Text>시작</Text></View>
            <TouchableOpacity onPress={() => setShowStartTimeModal(true)}>
              <View style={styles.S3box}><Text>{selectedStartTime}</Text></View>
            </TouchableOpacity>
          </View>

          <View style={styles.rowContainer}>
          <View style={styles.Tbox}><Text>종료</Text></View>
            <TouchableOpacity onPress={() => setShowEndTimeModal(true)}>
              <View style={styles.S3box}><Text>{selectedEndTime}</Text></View>
            </TouchableOpacity>
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
        </View>
      </View>
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
    borderColor: '#60b4f3',// 날짜~시간, 11:00
    backgroundColor :'#95cdf7',
    marginTop: hp('3%'), // 상단 여백 추가
  },
  S2box: {
    width: 300,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#60b4f3',// 날짜~시간, 11:00
    marginTop: hp('3%'), // 상단 여백 추가
  },
  S3box: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#60b4f3',// 날짜~시간, 11:00
    marginTop: hp('3%'), // 상단 여백 추가
    marginLeft: wp('2%'),
  },
  Tbox: {
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#60b4f3',//시작 종료
    backgroundColor :'#95cdf7',
    marginTop: hp('3%'), // 상단 여백 추가
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
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#60b4f3',// 예약버튼
    backgroundColor :'#95cdf7',
    marginTop: hp('7%'), // 상단 여백 추가
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
    height:hp('7%'),
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
    position: 'absolute', // 절대 위치 지정
    left: wp('2%'), // 좌측 여백 조정
    top: hp('5%'), // 상단 여백 조정
  },
  backIcon:{
    width: wp('7%'),
    height:hp('7%'),
  },
  title:{
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center', // 가운데 정렬 추가
    marginTop: hp('10%'), // 상단 여백 추가
    marginBottom: hp('3%'), // 상단 여백 추가
  },
  container: {
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // 가운데 정렬
    width: '100%',
    marginLeft: wp('2%'), // 시작 박스와 S3 박스 사이의 간격을 조절합니다.
},

});

export default FootballCenter;
