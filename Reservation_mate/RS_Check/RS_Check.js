import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView, StyleSheet, ImageBackground, Image } from 'react-native';
import { useUser, UserProvider } from '../UserContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getDatabase, ref, get, remove } from 'firebase/database';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const RS_Check = () => {
  const route = useRoute();
  const { userId } = route.params;
  const navigation = useNavigation();
  const [reservationData, setReservationData] = useState(null);
  const [busReservations, setBusReservations] = useState(null);

  useEffect(() => {
    const fetchReservationData = async () => {
      try {
        const db = getDatabase();
        const rsSnapshot = await get(ref(db, `reservations/RSData/${userId}`));
        const rsData = rsSnapshot.val();
        if (rsData) {
          const reservations = Object.entries(rsData).map(([location, reservation]) => ({
            location,
            ...reservation,
          }));
          setReservationData(reservations);
        } else {
          setReservationData([]);
        }

        const busSnapshot = await get(ref(db, 'reservations/Buses'));
        const busData = busSnapshot.val();
        setBusReservations(busData);
      } catch (error) {
        console.error("Error fetching reservation data:", error);
      }
    };

    if (userId) {
      fetchReservationData();
    }
  }, [userId]);

  const handleReservationChange = (index) => {
    const selectedReservation = reservationData[index];
    switch (selectedReservation.location) {
      case 'FootballCenter':
        navigation.navigate('FootballCenter', { userId });
        break;
      case 'Ground':
        navigation.navigate('Ground', { userId });
        break;
      case 'SportsCenter':
        navigation.navigate('SportsCenter', { userId });
        break;
      default:
        break;
    }
  };
  

  const handleReservationCancel = async (index) => {
    try {
      const db = getDatabase();
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
      console.error("Error canceling reservation:", error);
      Alert.alert('알림', '예약 취소 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handleBusReservationChange = (date, time, userId) => {
    navigation.navigate('BusSeat', { userId, date, time });
  };

  const handleBusReservationCancel = async (date, time, userId) => {
    try {
      const db = getDatabase();
      const reservationRef = ref(db, `reservations/Buses/${date}/${time}/${userId}`);
      await remove(reservationRef);

      setBusReservations((prevBusReservations) => {
        const updatedBusReservations = { ...prevBusReservations };
        delete updatedBusReservations[date][time][userId];
        if (Object.keys(updatedBusReservations[date][time]).length === 0) {
          delete updatedBusReservations[date][time];
        }
        if (Object.keys(updatedBusReservations[date]).length === 0) {
          delete updatedBusReservations[date];
        }
        return updatedBusReservations;
      });

      Alert.alert('알림', '버스 예약이 성공적으로 취소되었습니다!');
    } catch (error) {
      console.error("Error canceling bus reservation:", error);
      Alert.alert('알림', '버스 예약 취소 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <UserProvider>
      <ScrollView contentContainerStyle={styles.container}>
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
        <View style={styles.reservationContainer}>
          <Text style={styles.reservationHeader}>예약 내역</Text>
          {reservationData && reservationData.length > 0 ? (
            reservationData.map((userData, index) => {
              let displayLocation = '';
              let displayTitle = '';

              switch (userData.location) {
                case 'Ground':
                  displayLocation = '운동장';
                  displayTitle = `체육 시설 예약_${displayLocation}`;
                  break;
                case 'FootballCenter':
                  displayLocation = '풋볼장';
                  displayTitle = `체육 시설 예약_${displayLocation}`;
                  break;
                case 'SportsCenter':
                  displayLocation = '체육관';
                  displayTitle = `체육 시설 예약_${displayLocation}`;
                  break;
                default:
                  displayLocation = userData.location;
                  displayTitle = `체육 시설 예약_${displayLocation}`;
                  break;
              }

              return (
                <View key={index} style={styles.reservationCard}>
                  <Text style={styles.reservationNumber}>No.{index + 1} {displayTitle}</Text>
                  <Text style={styles.reservationLocation}>{`장소: ${displayLocation}`}</Text>
                  <Text style={styles.reservationDate}>{`일정: ${userData.Date} ${userData.Time}`}</Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => handleReservationChange(index)} style={styles.changeButton}>
                      <Text style={styles.buttonText}>예약 변경</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleReservationCancel(index)} style={styles.cancelButton}>
                      <Text style={styles.buttonText}>예약 취소</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })
          ) : null}

          {busReservations && Object.keys(busReservations).length > 0 ? (
            <View style={styles.busReservationContainer}>
              <Text style={styles.busReservationHeader}>버스 좌석 예약</Text>
              {Object.keys(busReservations).map((date) => (
                <View key={date} style={styles.busReservationDateContainer}>
                  {Object.keys(busReservations[date]).map((time) => (
                    <View key={time} style={styles.busReservationTimeContainer}>
                      {Object.entries(busReservations[date][time]).map(([userId, seat], index) => (
                        <View key={index} style={styles.busReservationDetailContainer}>
                          <Text style={styles.busReservationDetail}>{`좌석: ${seat} 번`}</Text>
                          <Text style={styles.busReservationTime}>{`일정: ${date} ${time}`}</Text>
                          <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => handleBusReservationChange(date, time, userId)} style={styles.changeButton}>
                              <Text style={styles.buttonText}>예약 변경</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleBusReservationCancel(date, time, userId)} style={styles.cancelButton}>
                              <Text style={styles.buttonText}>예약 취소</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      ))}
                    </View>
                  ))}
                </View>
              ))}
            </View>
          ) : null}

          {(reservationData && reservationData.length === 0 && (!busReservations || Object.keys(busReservations).length === 0)) && (
            <Text style={styles.noReservationText}>예약 내역이 없습니다.</Text>
          )}
        </View>
      </ScrollView>
    </UserProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
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
    marginLeft: wp('8%'),
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
  spacer: {
    width: wp('18%'),
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
  reservationContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    marginTop: hp('8%'), // Adjusted marginTop to place reservation above the banner
  },
  reservationHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  reservationCard: {
    padding: 20,
    backgroundColor: '#fff',
    marginVertical: 10,
    width: '100%',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  reservationNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reservationLocation: {
    fontSize: 14,
    marginVertical: 5,
  },
  reservationDate: {
    fontSize: 14,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  changeButton: {
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 5,
    marginRight: 10,
  },
  cancelButton: {
    padding: 10,
    backgroundColor: '#ff6b6b',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  noReservationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  // Styles for bus reservation section
  busReservationContainer: {
    padding: 20,
    backgroundColor: '#fff',
    marginVertical: 10,
    width: '100%',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  busReservationHeader: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  busReservationDateContainer: {
    marginBottom: 3
  },
  busReservationDate: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  busReservationTimeContainer: {
  
  },
  busReservationTime: {
    fontSize: 14,
    marginBottom: 12
  },
  busReservationDetailContainer: {
    marginTop: 5,
  },
  busReservationDetail: {
    fontSize: 14,
    marginBottom: 5
  },
});

export default RS_Check;
