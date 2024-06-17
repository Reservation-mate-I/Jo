import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import { format } from 'date-fns';

const BusScreen = () => {
  console.log("123123");
  const navigation = useNavigation();
  const totalSeats = 45; // 전체 좌석 수를 상수로 정의
  const [busData, setBusData] = useState([
    { time: '08:00', wonju: 'X', seats: `${totalSeats} / ${totalSeats}` },
    { time: '09:00', wonju: 'X', seats: `${totalSeats} / ${totalSeats}` },
    { time: '10:00', wonju: 'X', seats: `${totalSeats} / ${totalSeats}` },
    { time: '16:00', wonju: 'O', seats: `${totalSeats} / ${totalSeats}` },
    { time: '17:00', wonju: 'O', seats: `${totalSeats} / ${totalSeats}` },
    { time: '18:00', wonju: 'O', seats: `${totalSeats} / ${totalSeats}` },
  ]);
  console.log("qrqwr");

  useEffect(() => {
    const db = getDatabase();
    const today = format(new Date(), 'yyyy-MM-dd');
    const busesRef = ref(db, `reservations/Buses/${today}`);

    const fetchBusData = () => {
      onValue(busesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const updatedBusData = busData.map(bus => {
            const reservations = data[bus.time] || {};
            const reservedCount = Object.keys(reservations).length;
            console.log("adad");

            const remainingSeats = totalSeats - reservedCount;
            const wonju = isWonjuTime(bus.time) ? 'O' : 'X'; // 시간대에 따라 원주역 표시 변경

            return {
              ...bus,
              wonju,
              seats: `${remainingSeats} / ${totalSeats}`,
            };
          });

          setBusData(updatedBusData);
        } else {
          // Handle case where data is null or empty
          console.log("No data available");
        }
      }, (error) => {
        console.error("Error fetching data: ", error);
      });

      return () => {
        off(busesRef);
      };
    };

    fetchBusData(); // 최초 한 번 호출

  }, []);

  const isWonjuTime = (time) => {
    // '16:00'부터 '18:00' 사이의 시간대인지 확인
    return time >= '16:00' && time <= '18:00';
  };

  const handlePress = (time) => {
    navigation.navigate('BusSeat', { time });
  };

  const handleLinkPress = () => {
    Linking.openURL('https://www.gwnu.ac.kr/kr/7877/subview.do');
  };

  const renderBusData = () => {
    return busData.map((bus, index) => (
      <TouchableOpacity
        key={index}
        style={[styles.tableRow, bus.seats === '0 / 45' && styles.disabledRow]} // 예약 완료된 버스 시간대는 비활성화 스타일 적용
        onPress={() => handlePress(bus.time)}
        disabled={bus.seats === '0 / 45'}
      >
        <Text style={[styles.tableRowText, styles.timeColumn]}>{bus.time}</Text>
        <Text style={[styles.tableRowText, styles.stationColumn]}>{bus.wonju}</Text>
        <Text style={[styles.tableRowText, styles.seatColumn, bus.seats === '0 / 45' && styles.disabledText]}>{bus.seats}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <LinearGradient style={styles.headerContainer} colors={['#bfe1fb', '#bfe1fb']}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIconContainer}>
            <ImageBackground 
              source={require('../../assets/back-icon.png')}
              style={styles.backIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
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
          <View style={styles.spacer}/>
        </LinearGradient>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>버스 좌석 예약</Text>
        <View style={styles.separator} />
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableHeaderText, styles.timeColumn]}>시간</Text>
            <Text style={[styles.tableHeaderText, styles.stationColumn]}>원주역</Text>
            <Text style={[styles.tableHeaderText, styles.seatColumn]}>잔여 좌석</Text>
          </View>
          {renderBusData()}
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleLinkPress} style={styles.linkButton}>
          <Text style={styles.linkButtonText}>통학버스 운행 구간 및 시간표</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    alignItems: 'center',
  },
  headerContainer: {
    width: '100%',
    height: hp('17%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: wp('5%'),
    paddingTop: hp('5%'),
  },
  imageContainer: {
    width: wp('20%'),
  },
  imageStyle: {
    width: wp('16%'),
    height: hp('7%'),
    marginLeft: wp('2%'),
  },
  textContainer: {
    width: wp('60%'),
    alignItems: 'center',
  },
  textStyle: {
    fontSize: hp('3%'),
    fontWeight: 'bold',
    color: '#343a40',
  },
  subHeader: {
    fontSize: hp('1%'), 
    top: hp('1.2%'), 
    fontWeight: 'bold',
    color: '#868296',
  },
  spacer: {
    width: wp('20%'),
  },
  backIconContainer: {
    position: 'absolute',
    left: wp('2%'),
  },
  backIcon: {
    width: wp('7%'),
    height: hp('7%'),
  },
  content: {
    flex: 1,
    paddingHorizontal: wp('5%'),
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: hp('3%'),
    fontWeight: 'bold',
    marginVertical: hp('3%'),
  },
  separator: {
    width: '90%',
    height: 1,
    backgroundColor: '#ddd',
    marginBottom: hp('2%'),
  },
  table: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#007BFF',
    backgroundColor: '#fff',
  },
  tableHeader: {
    backgroundColor: '#007BFF',
  },
  tableHeaderText: {
    color: '#fff',
    fontSize: hp('2%'),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: hp('1%'),
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableRowText: {
    fontSize: hp('2%'),
    textAlign: 'center',
  },
  timeColumn: {
    flex: 1,
  },
  stationColumn: {
    flex: 1,
  },
  seatColumn: {
    flex: 1,
  },
  footer: {
    alignItems: 'center',
    marginVertical: hp('30%'),
    backgroundColor: '#fff',
  },
  linkButton: {
    backgroundColor: '#007BFF',
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('1%'),
    borderRadius: 5,
  },

  linkButtonText: {
    color: '#fff',
    fontSize: hp('2%'),
  },
});

export default BusScreen;
